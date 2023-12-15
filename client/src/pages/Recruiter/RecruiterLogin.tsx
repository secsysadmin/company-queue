import Banner from "../../components/Banner";
import { Stack, Input, Button, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { PIN_LENGTH, SERVER_ENDPOINT } from "../../utils/consts";
import { deleteCookie, setCookie } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

export default function RecruiterLogin() {
  deleteCookie("companyID");
  const [canSubmit, setCanSubmit] = useState(false);
  const [pin, setPin] = useState("");
  const [errorText, setErrorText] = useState<String>();

  const navigate = useNavigate();

  const login = async () => {
    const url = SERVER_ENDPOINT + `/api/company/recruiter-login?pin=${pin}`;
    const response = await fetch(url);
    if (response.ok) {
      const idText = await response.text();

      setCookie("companyID", JSON.parse(idText), 2);
      setErrorText("");
      navigate("/recruiter/dashboard");
    } else {
      setErrorText(await response.text());
    }
  };

  useEffect(() => {
    if (pin.length == PIN_LENGTH) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [pin]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: "50vw",
        }}>
        <Banner title='Recruiter Login'></Banner>
        <Stack minWidth='30vw'>
          <Text marginTop='3em'>Enter Your Company Queue Pin</Text>
          <Input
            variant='filled'
            placeholder='Pin'
            onChange={ev => setPin(ev.target.value)}></Input>
          <Button
            isDisabled={!canSubmit}
            backgroundColor='red.900'
            color='white'
            onClick={() => login()}>
            Login
          </Button>
        </Stack>
        <Text color={"red"}>{errorText}</Text>
      </div>
    </>
  );
}
