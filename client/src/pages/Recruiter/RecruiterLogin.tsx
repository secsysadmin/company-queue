import { Card, CardHeader, Stack, Heading, CardBody, Input, Button } from "@chakra-ui/react";
import Banner from "../../components/Banner";

export default function RecruiterLogin() {
    return <>
        <Banner title='Recruiter Login'></Banner>
        {/*@ts-ignore */}
        <div style={loginDiv}>
            <Card>
                <CardHeader>
                    <Heading size={'lg'}>Enter Company Pin</Heading>
                </CardHeader>
                <CardBody>
                    <Stack>
                        <Input placeholder="PIN (ex: 123456)"></Input>
                        <Button backgroundColor={'red.900'} color={'white'}>Login</Button>
                    </Stack>
                </CardBody>
            </Card>
        </div>
    </>;
}


const loginDiv = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '3em',
}