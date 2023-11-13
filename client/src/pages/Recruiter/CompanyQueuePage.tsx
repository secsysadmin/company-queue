import { Stack, Heading, Table, Thead, Tbody, Tr, Th, TableContainer, Card, CardHeader, CardBody, Button } from "@chakra-ui/react";
import Banner from "../../components/Banner";
import QueueStudent from "../../components/QueueStudent"; // Import the QueueStudent component

const tableCellStyle = {
  padding: '8px',
  margin: '0',
};

export default function CompanyQueuePage() {
  const company = "Tesla";

  // Define an array of students
  const students = [
    { number: 1, major: 'CPSC', name: 'John Smith' },
    { number: 2, major: 'MEEN', name: 'Allie Grater' },
    { number: 3, major: 'ELEN', name: 'Gene Eva Convenshun' },
  ];

  return (
    <>
      <Banner title='Company Queue for Recruiters'></Banner>
       {/*@ts-ignore*/}
      <div style={statusDivStyle}>

        <Stack>
          <Heading>{company}'s Line(s)</Heading>
          <Card backgroundColor={"blackAlpha.100"}>
            <CardHeader>
              <Heading size={'md'}>All Majors Line
                <div style={{ float: 'right' }}>
                  <Button colorScheme='red' size='sm'>Close Queue</Button>
                </div>
              </Heading>
            </CardHeader>
            <CardBody>
              <TableContainer>
                <Table variant='striped' colorScheme='blackAlpha' style={{ margin: '0', padding: '0' }}>
                  <Thead>
                    <Tr>
                      <Th style={tableCellStyle}>#</Th>
                      <Th style={tableCellStyle}>Major</Th>
                      <Th style={tableCellStyle}>Name</Th>
                      <Th style={tableCellStyle}>Remove</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {students.map((student, index) => (
                      <QueueStudent
                        key={index}
                        number={student.number}
                        major={student.major}
                        name={student.name}
                        onRemoveClick={() => handleRemoveStudent(student.number)}
                      />
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </CardBody>
          </Card>
        </Stack>
      </div>
    </>
  );
}

const statusDivStyle = {
  marginTop: '1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

// Define a function to handle student removal
function handleRemoveStudent(studentNumber: number) {
  // Implement student removal logic here
}
