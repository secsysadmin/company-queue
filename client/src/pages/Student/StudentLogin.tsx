import Banner from "../../components/Banner";
import {
  Input,
  Select,
  Button,
  Stack,
  Text,
  FormControl,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { SERVER_ENDPOINT } from "../../utils/consts";
import { Major } from "../../utils/interfaces";

export default function StudentLogin() {
  const [major, setMajor] = useState<string>();
  const [name, setName] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);
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

  useEffect(() => {
    setCanSubmit(isValidPhone(phoneNumber) && !!major && !!name);
  }, [major, phoneNumber, name]);

  // call login on backend
  async function joinQueue(
    phoneNumber: string,
    major: Major,
    companyName: string,
    name: string
  ) {
    const url = `${SERVER_ENDPOINT}/api/company-queue/join?companyName=${companyName}&phoneNumber=${phoneNumber}&major=${major}&name=${name}`;
    const response = await fetch(url, { method: "POST" });
    if (!response.ok) {
      const resText = await response.text();
      setErrorMessage(resText);
    } else {
      const responsebody = await response.json();
      navigate({
        pathname: "/student/status",
        search: createSearchParams({
          major,
          companyName,
          ticketNumber: responsebody.ticketNumber,
          phoneNumber,
        }).toString(),
      });
    }
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <Banner title='Queue Login'></Banner>
      <FormControl w={"50%"}>
        <Stack
          marginTop='2em'
          spacing={3}>
          <Text fontSize='xl'>Login to {company}'s queue</Text>
          <Input
            placeholder='Name'
            variant='filled'
            onChange={ev => setName(ev.target.value)}></Input>
          <Input
            placeholder='Phone Number'
            variant='filled'
            onChange={ev => setPhoneNumber(ev.target.value)}></Input>
          <Select
            placeholder='Major'
            variant='filled'
            onChange={ev => setMajor(ev.target.value as Major)}>
            {Object.values(Major).map((major, index) => (
              <option
                value={major}
                key={index}>
                {major}
              </option>
            ))}
            {/* These disabled options exist so someone can scroll 
                    to the bottom of the list without it cuttign off*/}
            <option
              disabled={true}
              value='NO'></option>
            <option
              disabled={true}
              value='NO'></option>
            <option
              disabled={true}
              value='NO'></option>
          </Select>
          <Button
            onClick={() =>
              joinQueue(phoneNumber, major as Major, company!, name!)
            }
            isDisabled={!canSubmit}
            backgroundColor='red.900'
            color='white'>
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
