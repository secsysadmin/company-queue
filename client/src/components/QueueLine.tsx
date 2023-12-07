import { Tr, Td, Button } from "@chakra-ui/react";

const QueueLineStyle = {
  padding: '8px',
  margin: '0',
};

interface QueueLineProps {
  major: string;
  lineLength: number;
  onNavigateClick: () => void; // Rename the prop to indicate navigation
}

export default function QueueLine(props: QueueLineProps) {
  return (
    <Tr>
      <Td style={QueueLineStyle}>{props.major}</Td>
      <Td style={QueueLineStyle}>{props.lineLength}</Td>
      <Td style={QueueLineStyle}>
        <Button colorScheme='green' size='sm' onClick={props.onNavigateClick}>
          View
        </Button>
      </Td>
    </Tr>
  );
}
