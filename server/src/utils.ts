import QueueModel from "./models/queue.model";

export const getRandomTicketNumber = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let ticketNumber = "";

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    ticketNumber += characters.charAt(randomIndex);
  }

  return ticketNumber;
};

export const getWaitTime = async (queueId: string, studentPhoneNumber: string) => {
  const queue = await QueueModel.findById(queueId);

  if (queue === null) {
    return;
  }

  const student = queue.studentsInLine.find(student => student.phoneNumber === studentPhoneNumber);

  if (!student) {
    // Student not found in the queue
    return;
  }

  const studentIndex = queue.studentsInLine.indexOf(student);
  const numStudentsAhead = studentIndex;
  const waitTimeMultiplier = numStudentsAhead + 1;

  return waitTimeMultiplier;
};
