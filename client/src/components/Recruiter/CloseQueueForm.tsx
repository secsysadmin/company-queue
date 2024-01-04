import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Box, Text, useToast } from "@chakra-ui/react";
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
  const toast = useToast();

  useEffect(() => {
    const disabled: boolean = typedCompanyName !== props.companyName;
    setSubmitDisabled(disabled);
  }, [typedCompanyName, props.companyName]);

  const closeQueue = () => {
    setErrorText("");
    setTypedCompanyName("");
    if (props.lineNumber === undefined) {
      setErrorText("Invalid Queue");
    }
    try {
    axios
      .delete(`/queue/close-queue/${props.companyName}/${props.lineNumber}`)
      .then(() => {
        navigate("/recruiter/dashboard");
      })
      .catch((error) => {
        setErrorText(error.message);
      });

      toast({
        title: "Queue Closed",
        description: "Queue has been closed",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Failed to close queue",
        description: "Please refresh or try again",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
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
