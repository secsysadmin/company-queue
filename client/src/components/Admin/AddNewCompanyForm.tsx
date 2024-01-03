import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Text, Input, Button, Stack, CardHeader, useToast } from "@chakra-ui/react";
import { PIN_LENGTH } from "../../utils/consts";

export default function AddNewCompanyForm() {
  const [adminPin, setAdminPin] = useState<string>();
  const [companyName, setCompanyName] = useState(String);
  const [booth, setBooth] = useState(String);
  const [pin, setPin] = useState(String);
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    if (companyName.length && booth.length && pin.length == PIN_LENGTH) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [companyName, booth, pin]);

  const toast = useToast();

  const createNewCompany = async () => {
    try {
      await axios.post("/company?adminPin=" + adminPin, {
        name: companyName,
        booth,
        pin,
      });

      setCompanyName("");
      setBooth("");
      setPin("");

      toast({
        title: "Company added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Failed to add company",
        description: "Please check your inputs and try again",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <Card width={"65vw"}>
        <CardHeader>
          <Text size={"lg"}>Add a new company</Text>
        </CardHeader>
        <Stack>
          <Input
            placeholder="Company Name"
            onChange={(ev) => setCompanyName(ev.target.value)}
          ></Input>
          <Input
            placeholder="Booth"
            onChange={(ev) => setBooth(ev.target.value)}
          ></Input>
          <Input
            placeholder="PIN"
            onChange={(ev) => setPin(ev.target.value)}
          ></Input>
          <Input
            placeholder="Admin PIN"
            onChange={(ev) => setAdminPin(ev.target.value)}
          ></Input>
          <Button
            backgroundColor={"red.900"}
            color="white"
            isDisabled={!canSubmit}
            onClick={() => createNewCompany()}
          >
            Submit
          </Button>
        </Stack>
      </Card>
    </div>
  );
}
