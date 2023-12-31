import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Stack,
  Heading,
  Table,
  Thead,
  Tbody,
  Th,
  TableContainer,
  Card,
  CardHeader,
  CardBody,
  Box,
} from "@chakra-ui/react";

import { Company, Queue } from "../../utils/interfaces";

import Banner from "../../components/Banner";
import QueueLine from "../../components/Recruiter/QueueLine";
import useRecruiterLogin from "../../utils/useRecruiterLogin";
import axios from "axios";

const tableCellStyle = {
  padding: "8px",
  margin: "0",
};

export default function RecruiterDashboard() {
  const navigate = useNavigate();
  const [company, setCompany] = useState<Company>();
  const [companyQueues, setCompanyQueues] = useState<Queue[]>();

  const { companyID } = useRecruiterLogin();

  useEffect(() => {
    if (companyID == undefined) {
      return;
    }

    axios.get("/company/id/" + companyID).then((res) => {
      setCompany(res.data);
      const companyName = res.data.name;
      axios.get("/queue/company/" + companyName).then((res) => {
        setCompanyQueues(res.data);
      });
    });
  }, [companyID]);

  function handleViewQueue(queue: Queue) {
    navigate(`/recruiter/queue?companyName=${company?.name}&id=${queue._id}`);
  }

  return (
    <>
      <Banner title="Queue for Recruiters" />
      <Box sx={statusDivStyle}>
        <Stack>
          <Heading textAlign="center">{company?.name}</Heading>
          <Card backgroundColor={"blackAlpha.100"} width={"85vw"}>
            <CardHeader>
              <Heading size={"md"}>
                Your lines
                <div style={{ float: "right" }}></div>
              </Heading>
            </CardHeader>
            <CardBody>
              <TableContainer whiteSpace="normal">
                <Table
                  variant="striped"
                  colorScheme="blackAlpha"
                  style={{ margin: "0", padding: "0" }}
                >
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
                        majors={line.majors}
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
      </Box>
    </>
  );
}

const statusDivStyle = {
  marginTop: "1rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
