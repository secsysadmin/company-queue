import { Stack, Heading, Table, Thead, Tbody, Th, TableContainer, Card, CardHeader, CardBody, Button } from "@chakra-ui/react";
import Banner from "../../components/Banner";
import QueueLine from "../../components/QueueLine"; // Import the QueueLine component
import { useState, useEffect } from 'react';
import { getCookie } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { Company, CompanyQueue } from "../../utils/interfaces";
import { SERVER_ENDPOINT } from "../../utils/consts";
import useRecruiterLogin from "../../utils/useRecruiterLogin";

const tableCellStyle = {
  padding: '8px',
  margin: '0',
};

export default function RecruiterDashboard() {
  const navigate = useNavigate();
  const [company, setCompany] = useState<Company>();
  const [companyQueues, setCompanyQueues] = useState<CompanyQueue[]>();

  // manage login state
  const {companyID} = useRecruiterLogin();

  useEffect(() => {
    if (companyID == undefined) {
      return;
    }
    const companyUrl = SERVER_ENDPOINT + `/api/company/id/${companyID}`;
    fetch(companyUrl).then((res) => {
      return res.json();
    }).then((data) => {
      setCompany(data);
    });

    const url = SERVER_ENDPOINT + `/api/company-queue/get-queues?id=${companyID}`;
    fetch(url).then((res) => {
      return res.json();
    }).then((data) => {
      setCompanyQueues(data);
    })
  }, [companyID]);

  function handleViewQueue(queue: CompanyQueue) {
    navigate(`/recruiter/queue?companyName=${company?.name}&id=${queue._id}`);
  }

  return (
    <>
      <Banner title='Company Queue for Recruiters' />
      {/*@ts-ignore*/}
      <div style={statusDivStyle}>
        <Stack>
          <Heading>{company?.name}</Heading>
          <Card backgroundColor={"blackAlpha.100"}>
            <CardHeader>
              <Heading size={'md'}>Your lines
                <div style={{ float: 'right' }}>
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
                    {companyQueues?.map((line, index) => (
                      <QueueLine
                        key={index}
                        major={line.majors.toString()}
                        onNavigateClick={() => handleViewQueue(line)} // Handle the view action
                        lineLength={line.studentsInLine.length}
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
