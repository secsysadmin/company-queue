import Banner from "../../components/Banner";
import { Input, Select, Button, Stack, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { SERVER_ENDPOINT } from "../../utils/consts";

export default function StudentLogin() {
    const [major, setMajor] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [canSubmit, setCanSubmit] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>();
    const location = useLocation();
    const navigate = useNavigate();

    const searchParams = new URLSearchParams(location.search);
    const company = searchParams.get("company");

    useEffect(() => {
        if (!company) {
            navigate('/404');
        }
    }, [location, searchParams, company]);

    useEffect(() => {
        setCanSubmit(isValidPhone(phoneNumber) && !!major);
    }, [major, phoneNumber]);


    // call login on backend 
    async function joinQueue(phoneNumber: string, major: string, companyName: string) {
        const url = `${SERVER_ENDPOINT}/api/company-queue/join?companyName=${companyName}&phoneNumber=${phoneNumber}&major=${major}`;
        const response = await fetch(url, { method: 'POST' });
        if (!response.ok) {
            const resText = await response.text();
            setErrorMessage(resText);
        }
        else {
            const responsebody = await response.json();
            navigate({pathname: '/student/status', search: createSearchParams({
                major,
                companyName: companyName,
                phoneNumber: responsebody.phoneNumber,
                ticketNumber: responsebody.ticketNumber,
                studentIndex: responsebody.newStudentIndex

            }).toString()});
        }
    }
    return (
        <div style={{ display: "flex", flexDirection: 'column', alignItems: 'center' }}>
            <Banner title="Queue Login"></Banner>
            <Stack marginTop='2em' spacing={3}>
                <Text fontSize='xl'>Login to {company}'s queue</Text>
                <Input placeholder="Phone Number" variant='filled' onChange={(ev) => setPhoneNumber(ev.target.value)}></Input>
                <Select placeholder='Major' variant='filled' onChange={(ev) => setMajor(ev.target.value)}>
                    <option value="AERO">AERO</option>
                    <option value="AREN">AREN</option>
                    <option value="BAEN">BAEN</option>
                    <option value="BMEN">BMEN</option>
                    <option value="CHEN">CHEN</option>
                    <option value="CVEN">CVEN</option>
                    <option value="CSCE">CSCE</option>
                    <option value="CPEN">CPEN</option>
                    <option value="ECEN">ECEN</option>
                    <option value="EVEN">EVEN</option>
                    <option value="ESET">ESET</option>
                    <option value="ISEN">ISEN</option>
                    <option value="IDIS">IDIS</option>
                    <option value="MSEN">MSEN</option>
                    <option value="MEEN">MEEN</option>
                    <option value="NUEN">NUEN</option>
                    <option value="OCEN">OCEN</option>
                    <option value="PETE">PETE</option>
                    {/* These disabled options exist so someone can scroll 
                    to the bottom of the list without it cuttign off*/}
                    <option disabled={true} value="NO"></option>
                    <option disabled={true} value="NO"></option>
                    <option disabled={true} value="NO"></option>
                </Select>
                <Button onClick={(ev) => joinQueue(phoneNumber, major, company!)} isDisabled={!canSubmit} backgroundColor='red.900' color='white'>Join Queue</Button>
            </Stack>
            <Text color={'red'}>{errorMessage}</Text>
        </div>
    );
}

function isValidPhone(phoneNumber: string) {
    // Define a regular expression for a U.S. phone number format
    const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

    // Test the phone number against the regular expression
    return phoneRegex.test(phoneNumber);
}
