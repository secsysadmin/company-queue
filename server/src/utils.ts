export const getRandomTicketNumber = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let ticketNumber = "";

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    ticketNumber += characters.charAt(randomIndex);
  }

  return ticketNumber;
};
