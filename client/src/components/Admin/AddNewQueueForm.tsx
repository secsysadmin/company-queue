import { useState } from "react";
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
import { Major } from "../../utils/interfaces";
import axios from "axios";

interface NewQueueProps {
  companyArray: { name: string; id: string }[];
}

export default function AddNewQueueForm(props: NewQueueProps) {
  const [company, setCompany] = useState("");
  const [lineNumber, setLineNumber] = useState(0);
  const [majors, setMajors] = useState<Major[]>([]);
  const [adminPin, setAdminPin] = useState<string>();

  const handleMajorChange = (checked: boolean, major: Major) => {
    if (checked) {
      setMajors((prevMajors) => [...prevMajors, major]);
    } else {
      setMajors((prevMajors) => prevMajors.filter((m) => m !== major));
    }
  };

  async function submit() {
    const companyObj = JSON.parse(company);

    await axios.post("/queue", {
      majors,
      adminPin,
      companyName: companyObj.name,
      companyID: companyObj.id,
      lineNumber,
    });
  }

  return (
    <div>
      <Card width={"65vw"}>
        <CardHeader>
          <Text size={"lg"}>Add new queue to company</Text>
        </CardHeader>
        <Stack>
          <Select
            placeholder="Company Name"
            onChange={(ev) => setCompany(ev.target.value)}
          >
            {props.companyArray?.map((company, index) => (
              <option value={JSON.stringify(company)} key={index}>
                {company.name}
              </option>
            ))}
          </Select>

          <Input
            type="number"
            placeholder="Line Number"
            onChange={(ev) => setLineNumber(parseInt(ev.target.value))}
          ></Input>

          <Input
            placeholder="Admin PIN"
            onChange={(ev) => setAdminPin(ev.target.value)}
          ></Input>

          {Object.values(Major).map((major, index) => (
            <Checkbox
              key={index}
              value={major}
              onChange={(e) => handleMajorChange(e.target.checked, major)}
            >
              {major}
            </Checkbox>
          ))}

          <Button
            backgroundColor={"red.900"}
            color="white"
            isDisabled={!(company && lineNumber && majors.length && adminPin)}
            onClick={() => submit()}
          >
            Submit
          </Button>
        </Stack>
      </Card>
    </div>
  );
}
