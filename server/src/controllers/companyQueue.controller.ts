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

  console.log(updatedQueue);

  //add them to queue
  await companyQueueModel.findByIdAndUpdate(correctQueue._id, updatedQueue);

  return res.json(updatedQueue.studentsInLine);
};

export const leaveQueue = async (req: Request, res: Response) => {
  const { ticketNumber } = req.query;

  //get company, line, and student from ticketNumber

  //remove student
};

export const spokenTo = async (req: Request, res: Response) => {
  leaveQueue(req, res);
};

export const notifyNext = async (req: Request, res: Response) => {
  const { companyName, lineNumber } = req.query;

  //get next 5 students in line

  //text 5 students
};
