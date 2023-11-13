import { Tr, Td, Button } from "@chakra-ui/react";

const QueueStudentStyle = {
  padding: '8px',
  margin: '0',
};

interface QueueStudentProps {
  number: number;
  major: string;
  name: string;
  onRemoveClick: () => void;
}

export default function QueueStudent(props: QueueStudentProps) {
  return (
    <Tr>
      <Td style={QueueStudentStyle}>{props.number}</Td>
      <Td style={QueueStudentStyle}>{props.major}</Td>
      <Td style={QueueStudentStyle}>{props.name}</Td>
      <Td style={QueueStudentStyle}>
        <Button colorScheme='red' size='sm' onClick={props.onRemoveClick}>Remove</Button>
      </Td>
    </Tr>
  );
}
