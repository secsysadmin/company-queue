import Banner from "../../components/Banner";
import { Stack, Input, Button, Text, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { PIN_LENGTH } from "../../utils/consts";
import { deleteCookie, setCookie } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RecruiterLogin() {
  deleteCookie("companyID");

  const [pin, setPin] = useState("");
  const [errorText, setErrorText] = useState<String>();

  const navigate = useNavigate();

  const login = async () => {
    axios
      .get("/company/recruiter-login?pin=" + pin)
      .then((res) => {
        setCookie("companyID", res.data._id, 2);
        setErrorText("");
        navigate("/recruiter/dashboard");
      })
      .catch((error) => {
        setErrorText(JSON.stringify(error.response.data));
      });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: "50vw",
        }}
      >
        <Banner title="Recruiter Login"></Banner>
        <Stack minWidth="30vw" spacing={3} maxWidth="80vw">
          <Heading marginTop="11em" fontSize="xl">Enter Your Company Queue Pin</Heading>
          <Input
            variant="filled"
            placeholder="Pin"
            fontWeight="semibold"
            onChange={(ev) => setPin(ev.target.value)}
          ></Input>
          <Button
            isDisabled={pin.length != PIN_LENGTH}
            backgroundColor="red.900"
            color="white"
            onClick={() => login()}
          >
            Login
          </Button>
        </Stack>
        <Text color={"red"}>{errorText}</Text>
      </div>
    </>
  );
}
