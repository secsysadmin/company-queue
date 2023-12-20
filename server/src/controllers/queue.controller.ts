import { Request, Response } from "express";
import QueueModel from "../models/queue.model";
import { Major } from "../models/major.model";
import { getRandomTicketNumber, getWaitTime } from "../utils";

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
//const twilio_client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export const joinQueue = async (req: Request, res: Response) => {
  const { companyName, major, phoneNumber, name } = req.body;

  const cleanedPhoneNumber = phoneNumber.replace(/[-\s()]/g, "");

  // get companyLines for company
  const queues = await QueueModel.find({
    companyName: companyName,
  });

  // check if queues is empty
  if (queues.length === 0) {
    return res.status(400).send("Company is not valid or has no queues.");
  }

  // decide which line to put student in
  const correctQueue = queues.find((queue) =>
    queue.majors.includes(major as Major)
  );

  if (correctQueue == undefined) {
    return res
      .status(400)
      .send("This company does not have a line for the selected major");
  }

  // check if student is already in any queue
  const studentAlreadyInQueue =
    (
      await QueueModel.find({
        "studentsInLine.phoneNumber": parseInt(cleanedPhoneNumber as string),
      })
    ).length > 0;

  if (studentAlreadyInQueue) {
    return res.status(401).send("Student already in a queue");
  }

  // assign student a unique ticket number
  const ticketNumber = getRandomTicketNumber();

  // add student to queue and update mongodb
  await QueueModel.findOneAndUpdate(
    {
      companyName: companyName,
      lineNumber: correctQueue.lineNumber,
    },
    {
      $push: {
        studentsInLine: {
          name: name,
          phoneNumber: cleanedPhoneNumber,
          ticketNumber: ticketNumber,
          major: major,
          joinedAt: Date.now(),
          notifiedAt: null,
        },
      },
    },
    { new: true }
  );

  const waitTime = await getWaitTime(correctQueue._id.toString());

  const numberOfStudentsInLine = correctQueue.studentsInLine.length;

  return res
    .status(200)
    .json({ ticketNumber, waitTime, numberOfStudentsInLine });
};

export const leaveQueue = async (req: Request, res: Response) => {
  const ticketNumber = req.params.ticketNumber;

  console.log(ticketNumber);

  const queue = await QueueModel.findOne({
    "studentsInLine.ticketNumber": ticketNumber,
  });

  // If the company queue is not found, the student is not in any company queue
  if (!queue) {
    return res
      .status(404)
      .json({ message: "Student not found in any company queue." });
  }

  const studentIndex = queue.studentsInLine.findIndex(
    (student) => student.ticketNumber === ticketNumber
  );

  // remove student
  queue.studentsInLine.splice(studentIndex, 1);

  await queue.save();

  return res.status(200).send();
};

export const spokenTo = async (req: Request, res: Response) => {
  leaveQueue(req, res);
};

export const notifyNext = async (req: Request, res: Response) => {
  const { companyName, lineNumber } = req.query;

  const correctQueue = await QueueModel.find({
    companyName: companyName,
    lineNumber: lineNumber,
  });

  // get next 5 students in line
  const studentsInLine = correctQueue[0].studentsInLine.sort(
    (student1, student2) => {
      return student1.joinedAt.getTime() - student2.joinedAt.getTime();
    }
  );

  let studentsToNotify = [];
  let i = 0;
  while (studentsToNotify.length < 5 && i < studentsInLine.length) {
    if (studentsInLine[i].notifiedAt == null) {
      studentsInLine[i].notifiedAt = new Date();
      studentsToNotify.push(studentsInLine[i].phoneNumber);
    }
    i++;
  }

  for (const phone_number of studentsToNotify) {
    const twilio_client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
    twilio_client.messages
      .create({
        body: `It is now your turn in ${companyName}'s line`,
        from: "+18559314118",
        to: "+1" + phone_number,
      })
      .then((message: { sid: string }) => console.log(message.sid));
  }
};

export const notifyStudent = async (req: Request, res: Response) => {
  const { phoneNumber, companyName } = req.query;
  const cleanedPhoneNumber = (phoneNumber as string).replace(/[-\s()]/g, "");

  const queue = await QueueModel.findOne({
    "studentsInLine.phoneNumber": parseInt(cleanedPhoneNumber as string),
  });

  // If the company queue is not found, the student is not in any company queue
  if (!queue) {
    return res
      .status(404)
      .json({ message: "Student not found in any company queue." });
  }

  for (let i = 0; i < queue.studentsInLine.length; i++){
    if (queue.studentsInLine[i].phoneNumber == cleanedPhoneNumber){
      const twilio_client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
      twilio_client.messages
      .create({
        body: `It is now your turn in ${companyName}'s line`,
        from: "+18559314118",
        to: "+1" + String(cleanedPhoneNumber),
      })
      .then((message: { sid: string }) => console.log(message.sid)).catch(() => {
        return res.status(500).send('error sending message');
      });

      queue.studentsInLine[i].notifiedAt = new Date();
      queue.save();
      break;
    }
  }
  return res.status(200).send("successfully notified student");
  
};

export const createQueue = async (req: Request, res: Response) => {
  const { adminPin, companyName, majors, companyID, lineNumber } = req.body;

  if (adminPin != process.env.ADMIN_PIN) {
    return res.status(400).json("invalid admin request").send();
  }

  const newQueue = new QueueModel({
    companyName: String(companyName),
    companyID: String(companyID),
    lineNumber: Number(lineNumber),
    majors,
    studentsInLine: [],
  });

  newQueue
    .save()
    .then(() => res.status(200).send())
    .catch(() =>
      res.status(401).json("failed to save queue to database").send()
    );
};

export const getQueueForStudent = async (req: Request, res: Response) => {
  const { phoneNumber } = req.query;
  const cleanedPhoneNumber = (phoneNumber as string).replace(/[-\s()]/g, "");

  const queue = await QueueModel.findOne({
    "studentsInLine.phoneNumber": parseInt(cleanedPhoneNumber as string),
  });

  // If the company queue is not found, the student is not in any company queue
  if (!queue) {
    return res
      .status(404)
      .json({ message: "Student not found in any company queue." });
  }

  const student = queue.studentsInLine.find(
    (student) => student.phoneNumber === cleanedPhoneNumber
  );

  if (!student) {
    return res.status(404).json({ message: "Student not found in queue." });
  }

  return res.status(200).json({
    companyName: queue.companyName,
    lineNumber: queue.lineNumber,
    ticketNumber: student?.ticketNumber,
    waitTime: await getWaitTime(
      queue._id.toString(),
      student.joinedAt.getTime()
    ),
    major: student.major,
    name: student.name,
  });
};

export const getQueuesForCompany = async (req: Request, res: Response) => {
  const companyId = req.params.companyId;

  try {
    const companyQueues = await QueueModel.find({
      companyID: companyId,
    });

    if (companyQueues.length === 0) {
      return res.status(400).json({ message: "no queue found" });
    }

    return res.status(200).json(companyQueues);
  } catch {
    return res
      .status(500)
      .send("db query error, possibly incorrectly formatted data");
  }
};

export const getQueueById = async (req: Request, res: Response) => {
  const queueId = req.params.queueId;

  try {
    const queue = await QueueModel.findById(queueId);

    if (queue == undefined) {
      return res.status(400).send("no queue found");
    }

    return res.status(200).json(queue);
  } catch {
    return res
      .status(500)
      .send("db query error, possibly incorrectly formatted data");
  }
};
