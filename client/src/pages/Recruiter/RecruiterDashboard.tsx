import { Stack, Heading, Table, Thead, Tbody, Th, TableContainer, Card, CardHeader, CardBody, Button } from "@chakra-ui/react";
import Banner from "../../components/Banner";
import QueueLine from "../../components/QueueLine"; // Import the QueueLine component

const tableCellStyle = {
  padding: '8px',
  margin: '0',
};

export default function RecruiterDashboard() {
  const company = "Tesla";

  // Define an array of queue lines
  const queueLines = [
    { major: 'ALL MAJORS' },
    { major: 'CPSC' },
    { major: 'MEEN' },
    { major: 'ELEN' },
  ];

  return (
    <>
      <Banner title='Company Queue for Recruiters' />
      {/*@ts-ignore*/}
      <div style={statusDivStyle}>
        <Stack>
          <Heading>{company}</Heading>
          <Card backgroundColor={"blackAlpha.100"}>
            <CardHeader>
              <Heading size={'md'}>Your lines
                <div style={{ float: 'right' }}>
                  <Button colorScheme='red' size='sm'>Close All Queues</Button>
                </div>
              </Heading>
            </CardHeader>
            <CardBody>
              <TableContainer>
                <Table variant='striped' colorScheme='blackAlpha' style={{ margin: '0', padding: '0' }}>
                  <Thead>
                    <tr>
                      <Th style={tableCellStyle}>Queue Major</Th>
                      <Th style={tableCellStyle}>Length</Th>
                      <Th style={tableCellStyle}>View</Th>
                    </tr>
                  </Thead>
                  <Tbody>
                    {queueLines.map((line, index) => (
                      <QueueLine
                        key={index}
                        major={line.major}
                        onNavigateClick={() => handleViewQueue(line.major)} // Handle the view action
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

// Define a function to handle the view action
function handleViewQueue(major: string) {
  // Implement the action to view the queue page or perform any other desired action
}
