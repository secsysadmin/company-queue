import Banner from "../../components/Banner";
import { Stack, Input, Button, Text } from '@chakra-ui/react';
import { useEffect, useState } from "react";

const PIN_LENGTH = 6;

export default function RecruiterLogin() {
    const [canSubmit, setCanSubmit] = useState(false);
    const [pin, setPin] = useState('');

    useEffect(() => {
        if(pin.length == PIN_LENGTH){
            setCanSubmit(true);
        }
        else{
            setCanSubmit(false);           
        }
    }, [pin]);

    return <>
        <div style={{ display: "flex", flexDirection: 'column', alignItems: 'center', minWidth:'50vw' }}>
            <Banner title='Recruiter Login'></Banner>
            <Stack minWidth='30vw'>
                <Text marginTop='3em'>Enter Your Company Queue Pin</Text>
                <Input variant='filled' placeholder="Pin" onChange={(ev) => setPin(ev.target.value)}></Input>
                <Button isDisabled={!canSubmit} backgroundColor='red.900' color='white'>Login</Button>
            </Stack>
        </div>
    </>;
}