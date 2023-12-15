import { Tr, Td, Button } from "@chakra-ui/react";
import { Major } from "../utils/interfaces";

const QueueLineStyle = {
  padding: "8px",
  margin: "0",
};

interface QueueLineProps {
  majors: Major[];
  lineLength: number;
  onNavigateClick: () => void; // Rename the prop to indicate navigation
}

export default function QueueLine(props: QueueLineProps) {
  return (
    <Tr>
      <Td style={QueueLineStyle}>{props.majors.join(", ")}</Td>
      <Td style={QueueLineStyle}>{props.lineLength}</Td>
      <Td style={QueueLineStyle}>
        <Button
          colorScheme='green'
          size='sm'
          onClick={props.onNavigateClick}>
          View
        </Button>
      </Td>
    </Tr>
  );
}
