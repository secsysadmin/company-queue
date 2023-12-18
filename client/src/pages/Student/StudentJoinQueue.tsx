import { useState, useEffect } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import {
  Input,
  Select,
  Button,
  Stack,
  Text,
  FormControl,
  Heading,
} from "@chakra-ui/react";

import { Major } from "../../utils/interfaces";

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
        const searchParams = {
          major,
          companyName,
          ticketNumber: res.data.ticketNumber,
          phoneNumber,
        };
        navigate({
          pathname: "/student/status",
          search: createSearchParams(searchParams).toString(),
        });
      })
      .catch((error) => {
        setErrorMessage(JSON.stringify(error));
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
              {company}'s{' '}
            </Text>
            Queue
          </Heading>
          <Input
            placeholder="Name"
            variant="filled"
            fontWeight="semibold"
            onChange={(ev) => setName(ev.target.value)}
          ></Input>
          <Input
            placeholder="Phone Number"
            variant="filled"
            fontWeight="semibold"
            onChange={(ev) => setPhoneNumber(ev.target.value)}
          ></Input>
          <Select
            placeholder="Major"
            variant="filled"
            fontWeight="semibold"
            onChange={(ev) => setMajor(ev.target.value as Major)}
          >
            {Object.values(Major).map((major, index) => (
              <option value={major} key={index}>
                {major}
              </option>
            ))}
            {/* These disabled options exist so someone can scroll 
                    to the bottom of the list without it cuttign off*/}
            <option disabled={true} value="NO"></option>
            <option disabled={true} value="NO"></option>
            <option disabled={true} value="NO"></option>
          </Select>
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
