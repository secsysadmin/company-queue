import { Request, Response } from "express";
import companyQueueModel, { CompanyQueue } from "../models/companyQueue.model";
import mongoose from "mongoose";

export const joinQueue = async (req: Request, res: Response) => {
  const { companyName, major, phoneNumber } = req.query;
  // const companyName = req.query.companyName;

  if (typeof major != "string") {
    return res.send("Major is invalid");
  }
  //get companyLines for company
  const companyQueues = await companyQueueModel.find({
    companyName: companyName,
  });

  //decide which line to put student in
  const correctQueue = companyQueues.find((queue) => {
    return queue.majors.includes(major);
  });

  if (correctQueue == undefined) {
    return res.send("Major not found");
  }

  //get index of last person in line
  const studentsInLine = correctQueue.studentsInLine.sort(
    (student1, student2) => {
      return student2.index - student1.index;
    }
  );

  const lastStudentIndex = studentsInLine[0].index + 1;

  const newStudent = {
    _id: new mongoose.Types.ObjectId(),
    phoneNumber: parseInt(phoneNumber as string),
    major: major,
    ticketNumber: "A5",
    index: lastStudentIndex,
  };

  const updatedLine = [...studentsInLine, newStudent];

  const updatedQueue = {
    ...correctQueue,
    studentsInLine: updatedLine,
  };

  //add them to queue
  // await companyQueueModel.findByIdAndUpdate(correctQueue._id, updatedQueue);

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

  res.send(studentsToNotify);

  //text 5 students
  //Deal with texting them later
};
