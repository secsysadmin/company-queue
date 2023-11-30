import { Request, Response } from "express";
import companyQueueModel, { CompanyQueue } from "../models/companyQueue.model";

import { ADMIN_PIN, findHighestLineNumber, getRandomTicketNumber } from "../utils";

export const joinQueue = async (req: Request, res: Response) => {
    const { companyName, major, phoneNumber } = req.query;

    if (typeof major != "string") {
        return res.status(400).send("Major is invalid");
    }

    // remove all hyphens, spaces, and parenthesis from the phone number
    const cleanedPhoneNumber = (phoneNumber as string).replace(/[-\s()]/g, "");

    // get companyLines for company
    const companyQueues = await companyQueueModel.find({
        companyName: companyName,
    });

    // check if companyQueues is empty
    if (companyQueues.length === 0) {
        return res.status(400).send("Company is not valid or has no queues.");
    }

    // decide which line to put student in
    const correctQueue = companyQueues.find(queue =>
        queue.majors.includes(major)
    );

    if (correctQueue == undefined) {
        return res.status(400).send("This company does not have a line for the selected major");
    }

    // check if student is already in queue
    const studentAlreadyInQueue = correctQueue.studentsInLine.find(
        student => student.phoneNumber === parseInt(cleanedPhoneNumber as string)
    );

    if (studentAlreadyInQueue) {
        return res.status(401).send("Student already in queue");
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
                    major: major,
                    contacted: false,
                    index: newStudentIndex,
                },
            },
        },
        { new: true }
    );

    return res.status(200).json({ ticketNumber, newStudentIndex, phoneNumber });
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
        if (studentsInLine[i].contacted == false) {
            studentsInLine[i].contacted = true;
            studentsToNotify.push(studentsInLine[i].phoneNumber);
        }
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

export const createQueue = async (req: Request, res: Response) => {
    const { adminPin, companyName, majors, companyID } = req.body;
    if (adminPin != ADMIN_PIN) {
        console.log(req)
        return res.status(400).json('invalid admin request').send();
    }
    const newLineNumber = await findHighestLineNumber(String(companyName)) + 1;
    console.log(majors);
    const majorsString = decodeURIComponent(majors);
    const majorsList = majorsString.split(',');

    const newQueue = new companyQueueModel({
        companyName: String(companyName),
        companyID: String(companyID),
        lineNumber: newLineNumber,
        majors: majorsList,
        studentsInLine: []
    });
    newQueue.save().then(() =>
        res.status(200).send()
    ).catch(() => res.status(401).json('failed to save queue to database').send());

}

export const checkStudent = async (req: Request, res: Response) => {
    const { phoneNumber, companyName, major } = req.query;
    const cleanedPhoneNumber = (phoneNumber as string).replace(/[-\s()]/g, "");

    if (typeof major != 'string') {
        return res.status(400).send('invalid major');
    }

    const companyQueues = await companyQueueModel.find({
        companyName: companyName,
    });

    const correctQueue = companyQueues.find(queue =>
        queue.majors.includes(major)
    );

    if (!correctQueue) {
        return res.status(400).send("queue does not exist")
    }

    const studentAlreadyInQueue = correctQueue.studentsInLine.find(
        student => student.phoneNumber === parseInt(cleanedPhoneNumber as string)
    );

    if (studentAlreadyInQueue) {
        return res.status(200).send("true");
    }
    else {
        return res.status(201).send("false")
    }

}

export const getQueues = async (req: Request, res: Response) => {
    const { id } = req.query;
    try {
        const companyQueues = await companyQueueModel.find({
            companyID: id
        });
        if (companyQueues.length === 0) {
            return res.status(400).send("no queue found");
        }
        return res.status(200).send(companyQueues);
    }
    catch{
        return res.status(500).send('db query error, possibly incorrectly formatted data')
    }
}
