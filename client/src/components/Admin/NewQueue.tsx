import {
  Card,
  Text,
  Input,
  Button,
  Stack,
  CardHeader,
  Select,
  Checkbox,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { SERVER_ENDPOINT } from "../../utils/consts";

interface NewQueueProps {
  companyArray: { name: string; id: string }[];
}

export default function NewQueue(props: NewQueueProps) {
  const [company, setCompany] = useState("");
  const [majors, setMajors] = useState<string[]>([]);
  const [adminPin, setAdminPin] = useState<string>();
  const [canSubmit, setCanSubmit] = useState(false);

  const majorOptions = [
    "AERO",
    "AREN",
    "BAEN",
    "BMEN",
    "CHEN",
    "CVEN",
    "CSCE",
    "CPEN",
    "ECEN",
    "EVEN",
    "ESET",
    "ISEN",
    "IDIS",
    "MSEN",
    "MEEN",
    "NUEN",
    "OCEN",
    "PETE",
  ];

  useEffect(() => {
    console.log(company, majors, adminPin);
    setCanSubmit(
      company.length > 0 && majors.length > 0 && adminPin?.length != null
    );
  }, [company, majors, adminPin]);

  const handleMajorChange = (checked: boolean, major: string) => {
    if (checked) {
      setMajors(prevMajors => [...prevMajors, major]);
    } else {
      setMajors(prevMajors => prevMajors.filter(m => m !== major));
    }
  };

  async function submit() {
    const majorsString = majors.join(",");
    const encodedMajors = encodeURIComponent(majorsString);
    const companyObj = JSON.parse(company);

    const url = SERVER_ENDPOINT + `/api/company-queue/create-queue`;
    const body = {
      majors: encodedMajors,
      adminPin: adminPin,
      companyName: companyObj.name,
      companyID: companyObj.id,
    };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <Text size={"lg"}>Add a new queue</Text>
        </CardHeader>
        <Stack>
          <Select
            placeholder='Company Name'
            onChange={ev => setCompany(ev.target.value)}>
            {/* Add options for company names here */}
            {props.companyArray?.map((company, index) => (
              <option
                value={JSON.stringify(company)}
                key={index}>
                {company.name}
              </option>
            ))}
          </Select>
          <Input
            placeholder='admin pin'
            onChange={ev => setAdminPin(ev.target.value)}></Input>

          {majorOptions.map((major, index) => (
            <Checkbox
              key={index}
              value={major}
              onChange={e => handleMajorChange(e.target.checked, major)}>
              {major}
            </Checkbox>
          ))}

          <Button
            backgroundColor={"red.900"}
            color='white'
            isDisabled={!canSubmit}
            onClick={ev => submit()}>
            Submit
          </Button>
        </Stack>
      </Card>
    </div>
  );
}
