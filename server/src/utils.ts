import companyQueueModel from "./models/companyQueue.model";

export const ADMIN_PIN = 'baileyOffDaLeash';

export const getRandomTicketNumber = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let ticketNumber = "";

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    ticketNumber += characters.charAt(randomIndex);
  }

  return ticketNumber;
};

export const findHighestLineNumber = async (companyName: string): Promise<number> => {
  try {
    const queues = await companyQueueModel.find({ companyName: companyName });

    let highestLineNumber = 0;
    queues.forEach((queue) => {
      if (queue.lineNumber > highestLineNumber) {
        highestLineNumber = queue.lineNumber;
      }
    });

    return highestLineNumber;
  } catch (error) {
    console.error('Error finding the highest line number:', error);
    throw error;
  }
}