import { Card, Text, Input, Button, Stack, CardHeader } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { PIN_LENGTH } from "../../utils/consts";

export default function NewCompany() {
    const [companyName, setCompanyName] = useState(String);
    const [booth, setBooth] = useState(String);
    const [pin, setPin] = useState(String);
    const [canSubmit, setCanSubmit] = useState(false);

    useEffect(() => {
        if(companyName.length && booth.length && pin.length == PIN_LENGTH){
            setCanSubmit(true);
        }
        else{
            setCanSubmit(false);
        }

    },[companyName, booth, pin])


    return (<div>
        <Card>
            <CardHeader>
            <Text size={'lg'}>Add a new company</Text>
            </CardHeader>
            <Stack>
                <Input placeholder="Company Name" onChange={(ev) => setCompanyName(ev.target.value)}></Input>
                <Input placeholder="Booth" onChange={(ev) => setBooth(ev.target.value)}></Input>
                <Input placeholder="Pin" onChange={(ev) => setPin(ev.target.value)}></Input>
                <Button backgroundColor={'red.900'} color='white' isDisabled={!canSubmit}>Submit</Button>
                
            </Stack>
        </Card>
    </div>);
}