import { Card, Text, Input, Button, Stack, CardHeader, Select, Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { useState, useEffect } from "react";


export default function newQueue() {
    const [companyName, setCompanyName] = useState(String);
    const [major, setMajor] = useState(String);
    const [canSubmit, setCanSubmit] = useState(false);

    useEffect(() => {
        if (companyName.length) {
            setCanSubmit(true);
        }
        else {
            setCanSubmit(false);
        }

    }, [companyName, major])


    return (<div>
        <Card>
            <CardHeader>
                <Text size={'lg'}>Add a new queue</Text>
            </CardHeader>
            <Stack>
                <Select placeholder="Company Name" onChange={(ev) => setCompanyName(ev.target.value)}>
                    
                </Select>

                <Checkbox>All Majors</Checkbox>
                <Checkbox>AERO</Checkbox>
                <Checkbox>AREN</Checkbox>
                <Checkbox>BAEN</Checkbox>
                <Checkbox>BMEN</Checkbox>
                <Checkbox>CHEN</Checkbox>
                <Checkbox>CVEN</Checkbox>
                <Checkbox>CSCE</Checkbox>
                <Checkbox>CPEN</Checkbox>
                <Checkbox>ECEN</Checkbox>
                <Checkbox>EVEN</Checkbox>
                <Checkbox>ESET</Checkbox>
                <Checkbox>ISEN</Checkbox>
                <Checkbox>IDIS</Checkbox>
                <Checkbox>MSEN</Checkbox>
                <Checkbox>MEEN</Checkbox>
                <Checkbox>NUEN</Checkbox>
                <Checkbox>OCEN</Checkbox>
                <Checkbox>PETE</Checkbox>

                <Button backgroundColor={'red.900'} color='white' isDisabled={!canSubmit}>Submit</Button>
            </Stack>
        </Card>
    </div>);
}