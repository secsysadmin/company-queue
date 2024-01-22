import Banner from "../../components/Banner";
import { Stack, Input, Button, Text, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { deleteCookie, setCookie } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminLogin() {
    deleteCookie("adminID");

    const [adminPin, setAdminPin] = useState("");
    const [errorText, setErrorText] = useState<String>();
    const navigate = useNavigate();

    const login = async () => {
        axios
            .get("/admin/admin-login?pin=" + adminPin)
            .then(() => {
                setCookie("adminID", "seccqadmin", 2);
                setErrorText("");
                navigate("/admin/dashboard");
            })
            .catch((error) => {
                setErrorText(JSON.stringify(error.message));
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
                <Banner title="Admin Login"></Banner>
                <Stack minWidth="30vw" spacing={3} maxWidth="80vw">
                    <Heading marginTop="11em" fontSize="xl">Enter Admin Pin</Heading>
                    <Input
                        variant="filled"
                        placeholder="Pin"
                        fontWeight="semibold"
                        onChange={(ev) => setAdminPin(ev.target.value)}
                    ></Input>
                    <Button
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
