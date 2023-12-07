import { Stack, Heading, Table, Thead, Tbody, Tr, Th, TableContainer, Card, CardHeader, CardBody, Button, Text } from "@chakra-ui/react";
import Banner from "../../components/Banner";
import QueueStudent from "../../components/QueueStudent"; // Import the QueueStudent component
import { useState, useEffect } from 'react'
import useRecruiterLogin from "../../utils/useRecruiterLogin";
import { useSearchParams, useNavigate } from "react-router-dom";
import { SERVER_ENDPOINT } from "../../utils/consts";
import { CompanyQueue } from "../../utils/interfaces";

const tableCellStyle = {
  padding: '8px',
  margin: '0',
};

export default function CompanyQueuePage() {

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState<string>();

  const companyName = searchParams.get('companyName');
  const queueID = searchParams.get('id');
  const [queue, setQueue] = useState<CompanyQueue>();

  // manage login state
  useRecruiterLogin();

  const update = () => {
    // validate link
    if (!companyName || !queueID) {
      navigate('/recruiter/dashboard');
    }

    // fetch queue
    const url = SERVER_ENDPOINT + `/api/company-queue/get-queue?id=${queueID}`;
    fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      return res.json();
    }).then((data) => {
      setQueue(data);
    }).catch((error) => setErrorText(JSON.stringify(error)));
  }

  const handleRemoveStudent = (ticketNumber: string) => {
    const url = SERVER_ENDPOINT + `/api/company-queue/mark-as-spoken-to?ticketNumber=${ticketNumber}`;

    // make api call
    fetch(url, { method: 'DELETE' }).then((res) => {
      return res.json();
    }).then(() => { update() }).catch((error) => console.error(error));
  }

  useEffect(() => {
    update();

  }, []);

  return (
    <>
      <Banner title='Company Queue for Recruiters'></Banner>
      {/*@ts-ignore*/}
      <div style={statusDivStyle}>

        <Stack width={'50vw'} maxWidth={'95vw'}>
          <Heading>Company: {companyName}</Heading>
          <Button minHeight={'50px'} backgroundColor={'red.900'} color={'white'} size='sm' onClick={() => update()}>Refresh Queue</Button>
          <Card backgroundColor={"blackAlpha.100"}>
            <CardHeader>
              <Heading size={'md'}>{queue?.majors.join(', ')} Line
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
                    {queue && queue.studentsInLine.map((student, index) => (
                      <QueueStudent
                        key={index}
                        number={student.phoneNumber}
                        major={student.major}
                        name={student.ticketNumber}
                        onRemoveClick={() => handleRemoveStudent(student.ticketNumber)}
                      />
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </CardBody>
          </Card>
          <Text color='red'>{errorText}</Text>
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

