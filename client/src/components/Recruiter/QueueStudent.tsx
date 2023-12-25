import { Tr, Td, Button, Text } from "@chakra-ui/react";
import { Major } from "../../utils/interfaces";

const QueueStudentStyle = {
  padding: "8px",
  margin: "0",
};

interface QueueStudentProps {
  number: number;
  major: Major;
  name: string;
  notifiedAt: Date;
  notifyStudent: () => void;
  onRemoveClick: () => void;
}

export default function QueueStudent(props: QueueStudentProps) {
  let notifyButton = <Text style={QueueStudentStyle}>Already Notified</Text>
  if(props.notifiedAt == null){
    notifyButton = <Button colorScheme="blue" size='sm' onClick={props.notifyStudent}>Notify</Button>;
  }

  return (
    <Tr>
      <Td style={QueueStudentStyle}>{props.number}</Td>
      <Td style={QueueStudentStyle}>{props.major}</Td>
      <Td style={QueueStudentStyle}>{props.name}</Td>
      <Td style={QueueStudentStyle}>
        {notifyButton}
      </Td>
      <Td style={QueueStudentStyle}>
        <Button colorScheme="red" size="sm" onClick={props.onRemoveClick}>
          Remove
        </Button>
      </Td>
    </Tr>
  );
}
