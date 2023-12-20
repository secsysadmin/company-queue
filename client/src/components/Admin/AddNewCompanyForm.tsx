import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Text, Input, Button, Stack, CardHeader } from "@chakra-ui/react";
import { PIN_LENGTH } from "../../utils/consts";

export default function AddNewCompanyForm() {
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

  const createNewCompany = async () => {
    await axios.post("/company", {
      name: companyName,
      booth,
      pin,
    });

    setCompanyName("");
    setBooth("");
    setPin("");
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
