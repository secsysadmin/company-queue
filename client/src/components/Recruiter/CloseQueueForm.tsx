import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Box, Text } from "@chakra-ui/react";
import axios from "axios";

interface CloseQueueFormProps {
  companyName: string;
  enabled: boolean;
  lineNumber: number | undefined;
}

export default function CloseQueueForm(props: CloseQueueFormProps) {
  const navigate = useNavigate();
  const [typedCompanyName, setTypedCompanyName] = useState<string>();
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
  const [errorText, setErrorText] = useState<string>("");

  useEffect(() => {
    const disabled: boolean = typedCompanyName !== props.companyName;
    console.log(disabled);
    setSubmitDisabled(disabled);
  }, [typedCompanyName, props.companyName]);

  const closeQueue = () => {
    setErrorText("");
    setTypedCompanyName("");
    if (props.lineNumber === undefined) {
      setErrorText("Invalid Queue");
    }

    axios
      .delete(`/queue/close-queue/${props.companyName}/${props.lineNumber}`)
      .then(() => {
        navigate("/recruiter/dashboard");
      })
      .catch((error) => {
        setErrorText(error.message);
      });
  };

  if (props.enabled) {
    return (
      <>
        <Box display="flex" flexDirection="row" justifyContent="space-around">
          <Input
            maxWidth={"70%"}
            backgroundColor={"white"}
            placeholder={`Type '${props.companyName}' to confirm`}
            onChange={(ev) => setTypedCompanyName(ev.target.value)}
          ></Input>
          <Button
            color="white"
            backgroundColor={"red.900"}
            isDisabled={submitDisabled}
            onClick={() => closeQueue()}
          >
            Close Queue
          </Button>
        </Box>
        <Text>{errorText}</Text>
      </>
    );
  } else {
    return <></>;
  }
}
