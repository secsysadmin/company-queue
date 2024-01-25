import { useState, useEffect } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import {
  Input,
  Button,
  Stack,
  Text,
  FormControl,
  Heading,
} from "@chakra-ui/react";

import { Major, Queue } from "../../utils/interfaces";

import Banner from "../../components/Banner";
import axios from "axios";

export default function StudentJoinQueue() {
  const [major, setMajor] = useState<string>();
  const [name, setName] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState("");

  const [errorMessage, setErrorMessage] = useState<string>();
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const company = searchParams.get("company");

  const [majorOptions, setMajorOptions] = useState<Major[]>([]);

  useEffect(() => {
    axios.get("/queue/company/" + company).then((res) => {
      const queues = res.data as Queue[];

      const majors = queues.map((queue: Queue) => queue.majors);
      setMajorOptions([...new Set<Major>(majors.flat()), Major.MISC]);
    });
  }, []);

  useEffect(() => {
    if (!company) {
      navigate("/");
    }
  }, [location, searchParams, company]);

  // call login on backend
  async function joinQueue(
    phoneNumber: string,
    major: Major,
    companyName: string,
    name: string
  ) {
    axios
      .post("/queue/join", {
        phoneNumber,
        major,
        companyName,
        name,
      })
      .then((res) => {
        return { ticketNumber: res.data.ticketNumber };
      }).then((data) => {
        const searchParams = {
          major,
          companyName,
          ticketNumber: data.ticketNumber,
          phoneNumber,
        };
        navigate({
          pathname: "/student/status",
          search: createSearchParams(searchParams).toString(),
        });
      })
      .catch((error) => {
        setErrorMessage(JSON.stringify(error.response.data));
      });
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Banner title="Join Queue"></Banner>
      <FormControl w={"60%"}>
        <Stack marginTop="11em" spacing={3}>
          <Heading fontSize="xl" textAlign="center" fontWeight="bold">
            Join{" "}
            <Text as="span" color="red.900">
              {company}'s{" "}
            </Text>
            Queue
          </Heading>
          <Text fontSize="md" textAlign="center">
            If you are already in a queue, you will not be able to join another until you leave.
          </Text>
          <Input
            placeholder="Name"
            variant="filled"
            fontWeight="semibold"
            onChange={(ev) => setName(ev.target.value)}
          ></Input>
          <Input
            placeholder="Phone Number (ex. 9798471787)"
            variant="filled"
            fontWeight="semibold"
            onChange={(ev) => setPhoneNumber(ev.target.value)}
          ></Input>
          <select
            placeholder="Major"
            style={{ backgroundColor: '#d3d3d3' }}
            onChange={(ev) => setMajor(ev.target.value as Major)}
          >
            {majorOptions.map((major, index) => (
              <option value={major} key={index}>
                {major}
              </option>
            ))}
            {/* These disabled options exist so someone can scroll 
                    to the bottom of the list without it cutting off*/}
            <option disabled={true} value="NO" selected={true}></option>
            <option disabled={true} value="NO"></option>
            <option disabled={true} value="NO"></option>
          </select>
          <Button
            onClick={() =>
              joinQueue(phoneNumber, major as Major, company!, name!)
            }
            isDisabled={!(isValidPhone(phoneNumber) && !!major && !!name)}
            backgroundColor="red.900"
            color="white"
          >
            Join Queue
          </Button>
        </Stack>
      </FormControl>
      <Text color={"red"}>{errorMessage}</Text>
    </div>
  );
}

function isValidPhone(phoneNumber: string) {
  // Define a regular expression for a U.S. phone number format
  const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

  // Test the phone number against the regular expression
  return phoneRegex.test(phoneNumber);
}
