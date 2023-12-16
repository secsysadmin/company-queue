import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Stack,
  Card,
  CardBody,
  CardHeader,
  Text,
  Heading,
  Button,
  Box,
} from "@chakra-ui/react";

import Banner from "../../components/Banner";
import axios from "axios";

export default function StudentStatus() {
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);

  const phoneNumber = searchParams.get("phoneNumber") || "";

  const [companyName, setCompanyName] = useState("");
  const [major, setMajor] = useState("");
  const [ticketNumber, setTicketNumber] = useState("");
  const [lineNumber, setLineNumber] = useState(0);
  const [waitTime, setWaitTime] = useState(0);
  const [name, setName] = useState("");

  const leaveQueue = async () => {
    axios.delete("/queue/leave/" + ticketNumber);
  };

  useEffect(() => {
    if (!phoneNumber) {
      navigate("/student/landing");
    }

    axios
      .get("/queue/student?phoneNumber=" + phoneNumber)
      .then((res) => {
        setCompanyName(res.data.companyName);
        setMajor(res.data.major);
        setTicketNumber(res.data.ticketNumber);
        setLineNumber(res.data.lineNumber);
        setWaitTime(res.data.waitTime);
        setName(res.data.name);
      })
      .catch(() => {
        navigate("/student/landing");
      });
  }, []);

  return (
    <>
      <Banner title="Company Queue"></Banner>
      <Box sx={statusDivStyle}>
        <Stack>
          <Heading>
            You are in <b>{companyName}'s</b> line
          </Heading>
          <Card backgroundColor={"red.900"}>
            <CardHeader>
              <Heading color={"white"} size={"md"}>
                Your Information:
              </Heading>
            </CardHeader>
            <CardBody>
              <Stack>
                <Heading size={"sm"} color={"white"}>
                  Name
                </Heading>
                <Text
                  fontSize={"md"}
                  backgroundColor={"gray.200"}
                  borderRadius={"5px"}
                  padding={"1"}
                  textAlign={"center"}
                  color={"black"}
                >
                  {name}
                </Text>

                <Heading size={"sm"} color={"white"}>
                  Phone Number
                </Heading>
                <Text
                  fontSize={"md"}
                  backgroundColor={"gray.200"}
                  borderRadius={"5px"}
                  padding={"1"}
                  textAlign={"center"}
                  color={"black"}
                >
                  {phoneNumber}
                </Text>

                <Heading size={"sm"} color={"white"}>
                  Major
                </Heading>
                <Text
                  fontSize={"md"}
                  backgroundColor={"gray.200"}
                  borderRadius={"5px"}
                  padding={"1"}
                  textAlign={"center"}
                  color={"black"}
                >
                  {major}
                </Text>

                <Heading size={"sm"} color={"white"}>
                  Line Number
                </Heading>
                <Text
                  fontSize={"md"}
                  backgroundColor={"gray.200"}
                  borderRadius={"5px"}
                  padding={"1"}
                  textAlign={"center"}
                  color={"black"}
                >
                  {lineNumber}
                </Text>

                <Heading size={"sm"} color={"white"}>
                  Wait Time
                </Heading>
                <Text
                  fontSize={"md"}
                  backgroundColor={"gray.200"}
                  borderRadius={"5px"}
                  padding={"1"}
                  textAlign={"center"}
                  color={"black"}
                >
                  {Math.floor(waitTime / 1000 / 60)} minutes
                </Text>

                <Heading size={"sm"} color={"white"}>
                  Exit Code
                </Heading>
                <Text
                  fontSize={"md"}
                  backgroundColor={"gray.200"}
                  borderRadius={"5px"}
                  padding={"1"}
                  textAlign={"center"}
                  color={"black"}
                >
                  {ticketNumber}
                </Text>
              </Stack>
            </CardBody>
          </Card>
          <Button
            onClick={() => leaveQueue()}
            backgroundColor={"red.900"}
            color={"white"}
          >
            Leave Queue
          </Button>
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
