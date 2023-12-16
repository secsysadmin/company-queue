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

export const getWaitTime = async (queueId: string, joinedAt?: number) => {
  const queue = await QueueModel.findById(queueId);

  if (queue === null) {
    return;
  }

  const sortedStudents = queue.studentsInLine.sort((student1, student2) => {
    return student1.joinedAt.getTime() - student2.joinedAt.getTime();
  });

  const earliestStudent = sortedStudents[0] ?? { joinedAt: new Date() };

  return (joinedAt ?? Date.now()) - earliestStudent.joinedAt.getTime();
};
