import { Request, Response } from "express";
import companyQueueModel, { CompanyQueue } from "../models/companyQueue.model";
import mongoose from "mongoose";

export const joinQueue = async (req: Request, res: Response) => {
  const { companyName, major, phoneNumber } = req.query;
  // const companyName = req.query.companyName;

  if (typeof major != "string") {
    return res.send("Major is invalid");
  }

  //remove all hyphens, spaces, and parenthesis from the phone number
  const updatedPhoneNumber = (phoneNumber as string).replace(/[-\s()]/g, "");

  //get companyLines for company
  const companyQueues = await companyQueueModel.find({
    companyName: companyName,
  });

  // Check if companyQueues is empty
  if (companyQueues.length === 0) {
    return res.send("Company is not valid or has no queues.");
  }

  //decide which line to put student in
  const correctQueue = companyQueues.find((queue) => {
    return queue.majors.includes(major);
  });

  if (correctQueue == undefined) {
    return res.send("Major not found");
  }

  // Check if student is already in queue
  for(let i = 0; i < correctQueue.studentsInLine.length; ++i){
    if (parseInt(updatedPhoneNumber) === correctQueue.studentsInLine[i].phoneNumber){
      return res.send("Student is already in queue");
    }
  }

  //get index of last person in line
  const studentsInLine = correctQueue.studentsInLine.sort(
    (student1, student2) => {
      return student2.index - student1.index;
    }
  );

  //If first person in line, then give them 0
  const lastStudentIndex = studentsInLine?.[0]?.index + 1 || 100;

  //Assign student a unique ticket number
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let ticketNumber = "";

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    ticketNumber += characters.charAt(randomIndex);
  }

  const newStudent = {
    _id: new mongoose.Types.ObjectId(),
    phoneNumber: parseInt(updatedPhoneNumber as string),
    major: major,
    ticketNumber: ticketNumber,
    index: lastStudentIndex,
  };

  const updatedLine = [...studentsInLine, newStudent];

  const updatedQueue = {
    ...correctQueue,
    studentsInLine: updatedLine,
  };

  //update the queue
  await companyQueueModel.findOneAndUpdate(
    { _id: correctQueue._id },
    { $set: { studentsInLine: updatedLine } }
  );

  return res.json(updatedQueue.studentsInLine);
};

export const leaveQueue = async (req: Request, res: Response) => {
  const ticketNumber = req.query.ticketNumber;

  //get company, line, and student from ticketNumber
  // const companyQueue = await companyQueueModel.find({
  //   ticketNumber: ticketNumber,
  // });

  const companyQueue = await companyQueueModel.findOne({
    "studentsInLine.ticketNumber": ticketNumber,
  });

  if (!companyQueue) {
    // If the company queue is not found, the student is not in any company queue
    return res
      .status(404)
      .json({ message: "Student not found in any company queue." });
  }

  const studentIndex = companyQueue.studentsInLine.findIndex(
    (student) => student.ticketNumber === ticketNumber
  );

  if (studentIndex === -1) {
    // If the student is not found in the company queue, return an error
    return res
      .status(404)
      .json({ message: "Student not found in the company queue." });
  }
  //remove student
  companyQueue.studentsInLine.splice(studentIndex, 1);

  await companyQueue.save();

  // return res.json({ message: "Student removed from the company queue." });
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

  //get next 5 students in line
  const studentsInLine = correctQueue[0].studentsInLine.sort(
    (student1, student2) => {
      return student1.index - student2.index;
    }
  );

  let studentsToNotify = [];

  for (let i = 0; i < Math.min(5, studentsInLine.length); i++) {
    studentsToNotify.push(studentsInLine[i].phoneNumber);
  }

  console.log(studentsToNotify)

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
