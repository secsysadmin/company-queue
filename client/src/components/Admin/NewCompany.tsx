import { Card, Text, Input, Button, Stack, CardHeader } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { PIN_LENGTH, SERVER_ENDPOINT } from "../../utils/consts";

export default function NewCompany() {
    const [companyName, setCompanyName] = useState(String);
    const [booth, setBooth] = useState(String);
    const [pin, setPin] = useState(String);
    const [canSubmit, setCanSubmit] = useState(false);

    useEffect(() => {
        if (companyName.length && booth.length && pin.length == PIN_LENGTH) {
            setCanSubmit(true);
        }
        else {
            setCanSubmit(false);
        }

    }, [companyName, booth, pin]);

    const createNewCompany = async () => {
        const url = `${SERVER_ENDPOINT}/api/company/`;
        const body = {
            name: companyName,
            pin: pin,
            booth: booth
        };
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(body)
        });
        setCompanyName('');
        setBooth('');
        setPin('');
    }


    return (<div>
        <Card>
            <CardHeader>
                <Text size={'lg'}>Add a new company</Text>
            </CardHeader>
            <Stack>
                <Input placeholder="Company Name" onChange={(ev) => setCompanyName(ev.target.value)}></Input>
                <Input placeholder="Booth" onChange={(ev) => setBooth(ev.target.value)}></Input>
                <Input placeholder="Pin" onChange={(ev) => setPin(ev.target.value)}></Input>
                <Button backgroundColor={'red.900'} color='white' isDisabled={!canSubmit} onClick={(ev) => createNewCompany()}>Submit</Button>

            </Stack>
        </Card>
    </div>);
}