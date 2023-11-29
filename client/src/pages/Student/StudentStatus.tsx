import { Stack, Card, CardBody, CardHeader, Text, Heading, Button } from "@chakra-ui/react";
import Banner from "../../components/Banner";

interface StudentStatusProps {
    companyName: string;
    ticketNumber: string;
    
}

export default function StudentStatus(props: StudentStatusProps) {


    const company = "Tesla";
    return (<>
        <Banner title='Company Queue'></Banner>
        {/*@ts-ignore*/}
        <div style={statusDivStyle}>
        <Stack>
            <Heading>You are in <b>{company}'s</b> line</Heading>
            <Card backgroundColor={'red.900'}>
                <CardHeader>
                    <Heading color={'white'} size={'md'}>Your Information:</Heading>
                </CardHeader>
                <CardBody>
                    <Stack>
                    <Heading size={'sm'} color={'white'}>Name</Heading>
                    <Text fontSize={'md'} backgroundColor={'gray.200'} borderRadius={'5px'} padding={'1'} textAlign={'center'} color={'black'}>placeholder</Text>
                    <Heading size={'sm'} color={'white'}>Major</Heading>
                    <Text fontSize={'md'} backgroundColor={'gray.200'} borderRadius={'5px'} padding={'1'} textAlign={'center'} color={'black'}>CSCE</Text>
                    <Heading size={'sm'} color={'white'}>Exit Code</Heading>
                    <Text fontSize={'md'} backgroundColor={'gray.200'} borderRadius={'5px'} padding={'1'} textAlign={'center'} color={'black'}>1234</Text>
                    </Stack>
                </CardBody>
            </Card>
            <Button onClick={(ev) => leaveQueue} backgroundColor={'red.900'} color={'white'}>Leave Queue</Button>
        </Stack>
        </div>
    </>);
}

function leaveQueue(phoneNumber: string){

}

const statusDivStyle = {
    marginTop: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}