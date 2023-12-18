import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Stack,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Card,
  CardHeader,
  CardBody,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";

import Banner from "../../components/Banner";

import { Queue } from "../../utils/interfaces";
import QueueStudent from "../../components/Recruiter/QueueStudent";
import useRecruiterLogin from "../../utils/useRecruiterLogin";
import axios from "axios";

const tableCellStyle = {
  padding: "8px",
  margin: "0",
};

export default function QueuePage() {
  const [searchParams, _] = useSearchParams();
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState<string>();

  const companyName = searchParams.get("companyName");
  const queueID = searchParams.get("id");
  const [queue, setQueue] = useState<Queue>();

  // manage login state
  useRecruiterLogin();

  const update = () => {
    // validate link
    if (!companyName || !queueID) {
      navigate("/recruiter/dashboard");
    }

    axios
      .get("/queue/id/" + queueID)
      .then((res) => {
        setQueue(res.data);
      })
      .catch((error) => {
        setErrorText(JSON.stringify(error));
      });
  };

  const handleRemoveStudent = (ticketNumber: string) => {
    axios
      .delete("/queue/mark-as-spoken-to/" + ticketNumber)
      .then(() => {
        update();
      })
      .catch((error) => {
        setErrorText(JSON.stringify(error));
      });
  };

  useEffect(() => {
    update();
  }, []);

  return (
    <>
      <Banner title="Queue for Recruiters"></Banner>
      <Box sx={statusDivStyle}>
        <Stack width={"85vw"} maxWidth={"95vw"} spacing={3}>
          <Heading textAlign={"center"}>{companyName}</Heading>
          <Button
            minHeight={"50px"}
            backgroundColor={"red.900"}
            color={"white"}
            size="sm"
            onClick={() => update()}
          >
            Refresh Queue
          </Button>
          <Card backgroundColor={"blackAlpha.100"}>
            <CardHeader>
              <Heading size={"md"}>
                {queue?.majors.join(", ")} Line
                <div style={{ float: "right" }}>
                  <Button colorScheme="red" size="sm">
                    Close Queue
                  </Button>
                </div>
              </Heading>
            </CardHeader>
            <CardBody>
              <TableContainer whiteSpace={"normal"}>
                <Table
                  variant="striped"
                  colorScheme="blackAlpha"
                  style={{ margin: "0", padding: "0" }}
                >
                  <Thead>
                    <Tr>
                      <Th style={tableCellStyle}>#</Th>
                      <Th style={tableCellStyle}>Major</Th>
                      <Th style={tableCellStyle}>Name</Th>
                      <Th style={tableCellStyle}>Remove</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {queue &&
                      queue.studentsInLine.map((student, index) => (
                        <QueueStudent
                          key={index}
                          number={student.phoneNumber}
                          major={student.major}
                          name={student.ticketNumber}
                          onRemoveClick={() =>
                            handleRemoveStudent(student.ticketNumber)
                          }
                        />
                      ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </CardBody>
          </Card>
          <Text color="red">{errorText}</Text>
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
