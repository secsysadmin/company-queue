import React, { useEffect, useState } from "react";
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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import Banner from "../../components/Banner";
import axios from "axios";

export default function StudentStatus() {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);

  const searchParams = new URLSearchParams(location.search);

  const phoneNumber = searchParams.get("phoneNumber") || "";

  const [companyName, setCompanyName] = useState("");
  const [major, setMajor] = useState("");
  const [ticketNumber, setTicketNumber] = useState("");
  const [lineNumber, setLineNumber] = useState(0);
  const [waitTime, setWaitTime] = useState(0);
  const [name, setName] = useState("");

  const update = () => {
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
  };

  const leaveQueue = async () => {
    axios.delete("/queue/leave/" + ticketNumber).then(() => {
      update();
    });

  };

  useEffect(() => {
    update();
  }, []);

  return (
    <>
      <Banner title="Your Status"></Banner>
      <Box sx={statusDivStyle}>
        <Stack>
          <Heading fontSize="xl" textAlign="center" fontWeight="bold">
            You are in{" "}
            <Text as="span" color="red.900">
              {companyName}'s{" "}
            </Text>
            Queue
          </Heading>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
            backgroundColor="gray.100"
            padding="4"
            borderRadius="md"
            marginTop="4"
          >
            <Text fontSize="md">
              If your wait time permits, feel free to talk to other companies while you wait.
            </Text>
          </Box>
          <Card backgroundColor={"gray.100"}>
            <CardHeader>
              <Heading color={"black"} size={"md"}>
                Your Information:
              </Heading>
            </CardHeader>
            <CardBody>
              <Stack>
                <Heading size={"sm"} color={"red.900"}>
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

                <Heading size={"sm"} color={"red.900"}>
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

                <Heading size={"sm"} color={"red.900"}>
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

                <Heading size={"sm"} color={"red.900"}>
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

                <Heading size={"sm"} color={"red.900"}>
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

                <Heading size={"sm"} color={"red.900"}>
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
            onClick={onOpen}
            backgroundColor={"red.900"}
            color={"white"}
          >
            Leave Queue
          </Button>
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent maxWidth={"80vw"}>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Leave Queue
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure you want to leave the queue?
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    No
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      leaveQueue();
                      onClose();
                    }}
                    ml={3}
                  >
                    Yes
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
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
  height: "100vh",
  width: "80%",
  maxWidth: "600px",
  margin: "2rem auto",
};
