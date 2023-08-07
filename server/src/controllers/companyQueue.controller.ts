import { Request, Response } from "express";
import companyQueueModel from "../models/companyQueue.model";

import { getRandomTicketNumber } from "../utils";

export const joinQueue = async (req: Request, res: Response) => {
  const { companyName, major, phoneNumber } = req.query;

  if (typeof major != "string") {
    return res.send("Major is invalid");
  }

  // remove all hyphens, spaces, and parenthesis from the phone number
  const cleanedPhoneNumber = (phoneNumber as string).replace(/[-\s()]/g, "");

  // get companyLines for company
  const companyQueues = await companyQueueModel.find({
    companyName: companyName,
  });

  // check if companyQueues is empty
  if (companyQueues.length === 0) {
    return res.send("Company is not valid or has no queues.");
  }

  // decide which line to put student in
  const correctQueue = companyQueues.find(queue =>
    queue.majors.includes(major)
  );

  if (correctQueue == undefined) {
    return res.send("Major not found");
  }

  // check if student is already in queue
  const studentAlreadyInQueue = correctQueue.studentsInLine.find(
    student => student.phoneNumber === parseInt(cleanedPhoneNumber as string)
  );

  if (studentAlreadyInQueue) {
    return res.send("Student already in queue");
  }

  // get index for student
  let newStudentIndex = 1;
  if (correctQueue.studentsInLine.length !== 0) {
    const studentWithHighestIndex = correctQueue.studentsInLine.reduce(
      (student1, student2) => {
        return student1.index > student2.index ? student1 : student2;
      }
    );

    newStudentIndex = studentWithHighestIndex.index + 1;
  }

  // assign student a unique ticket number
  const ticketNumber = getRandomTicketNumber();

  // add student to queue and update mongodb
  const updatedQueue = await companyQueueModel.findOneAndUpdate(
    {
      companyName: companyName,
      lineNumber: correctQueue.lineNumber,
    },
    {
      $push: {
        studentsInLine: {
          phoneNumber: parseInt(cleanedPhoneNumber as string),
          ticketNumber: ticketNumber,
          index: newStudentIndex,
        },
      },
    },
    { new: true }
  );

  return res.json(updatedQueue?.studentsInLine);
};

export const leaveQueue = async (req: Request, res: Response) => {
  const ticketNumber = req.query.ticketNumber;

  const companyQueue = await companyQueueModel.findOne({
    "studentsInLine.ticketNumber": ticketNumber,
  });

  // If the company queue is not found, the student is not in any company queue
  if (!companyQueue) {
    return res
      .status(404)
      .json({ message: "Student not found in any company queue." });
  }

  const studentIndex = companyQueue.studentsInLine.findIndex(
    student => student.ticketNumber === ticketNumber
  );

  // remove student
  companyQueue.studentsInLine.splice(studentIndex, 1);

  await companyQueue.save();

  return res.json(companyQueue.studentsInLine);
};

export const spokenTo = async (req: Request, res: Response) => {
  leaveQueue(req, res);
};

export const notifyNext = async (req: Request, res: Response) => {
  const { companyName, lineNumber } = req.query;

  const correctQueue = await companyQueueModel.find({
    companyName: companyName,
    lineNumber: lineNumber,
  });

  // get next 5 students in line
  const studentsInLine = correctQueue[0].studentsInLine.sort(
    (student1, student2) => {
      return student1.index - student2.index;
    }
  );

  let studentsToNotify = [];

  for (let i = 0; i < Math.min(5, studentsInLine.length); i++) {
    studentsToNotify.push(studentsInLine[i].phoneNumber);
  }

  res.json(studentsToNotify);

  // const accountSid = process.env.TWILIO_ACCOUNT_SID;
  // const authToken = process.env.TWILIO_AUTH_TOKEN;

  // const accountSid = "ACf3619a02abe3e565809b1b6ad97e9cfb";
  // const authToken = "6a06d1074d18eaec38a4d592cac415c2";
  // const client = require("twilio")(accountSid, authToken);

  // var numbersToMessage = ["+15122025107", "+15126219469", "+15127961325"];

  // numbersToMessage.forEach(function (number) {
  //   var message = client.messages
  //     .create({
  //       body: "Hola coma estas senor :)",
  //       from: "+18662936588",
  //       to: number,
  //     })
  //     .then((message: { status: string }) => console.log(message.status))
  //     .catch((error: any) => console.error(error));
  // });
};
