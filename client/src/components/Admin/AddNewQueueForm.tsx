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
  useToast,
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

  const toast = useToast();

  const handleMajorChange = (checked: boolean, major: Major) => {
    if (checked) {
      setMajors((prevMajors) => [...prevMajors, major]);
    } else {
      setMajors((prevMajors) => prevMajors.filter((m) => m !== major));
    }
  };

  async function submit() {
    const companyObj = JSON.parse(company);
    try {
      await axios.post("/queue", {
        majors,
        adminPin,
        companyName: companyObj.name,
        companyID: companyObj.id,
        lineNumber,
      });

      toast({
        title: "Queue added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Failed to add queue",
        description: "Please check your inputs and try again",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
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

          <Button
            w={"50%"}
            onClick={() => {
              if (majors.length != Object.values(Major).length)
                setMajors(Object.values(Major));
              else setMajors([] as Major[]);
            }}
          >
            {majors.length != Object.values(Major).length
              ? "Select All Majors"
              : "Unselect All Majors"}
          </Button>

          {Object.values(Major).map((major, index) => (
            <Checkbox
              key={index}
              value={major}
              onChange={(e) => handleMajorChange(e.target.checked, major)}
              isChecked={majors.includes(major)}
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
