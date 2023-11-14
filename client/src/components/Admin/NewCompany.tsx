import { Card, Text, Input, Button, Stack, CardHeader } from "@chakra-ui/react";
import { useState } from "react";

export default function NewCompany() {

    return (<div>
        <Card>
            <CardHeader>
            <Text size={'lg'}>Add a new company</Text>
            </CardHeader>
            <Stack>
                <Input placeholder="Company Name"></Input>
                <Input placeholder="Booth"></Input>
                <Input placeholder="Pin"></Input>
                <Button>Submit</Button>
            </Stack>
        </Card>
    </div>);
}