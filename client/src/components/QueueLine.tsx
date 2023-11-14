import { useState, useEffect } from 'react';
import { Tr, Td, Button } from "@chakra-ui/react";

const QueueLineStyle = {
  padding: '8px',
  margin: '0',
};

interface QueueLineProps {
  major: string;
  onNavigateClick: () => void; // Rename the prop to indicate navigation
}

export default function QueueLine(props: QueueLineProps) {
  const [numberOfPeople, setNumberOfPeople] = useState(0);

  // Simulate an effect that updates the number of people in the line
  useEffect(() => {
    // You can fetch or calculate the number of people dynamically here
    // For this example, we simulate it with a random number
    const randomNumberOfPeople = Math.floor(Math.random() * 100);
    setNumberOfPeople(randomNumberOfPeople);
  }, []);

  return (
    <Tr>
      <Td style={QueueLineStyle}>{props.major}</Td>
      <Td style={QueueLineStyle}>{numberOfPeople}</Td>
      <Td style={QueueLineStyle}>
        <Button colorScheme='green' size='sm' onClick={props.onNavigateClick}>
          View
        </Button>
      </Td>
    </Tr>
  );
}
