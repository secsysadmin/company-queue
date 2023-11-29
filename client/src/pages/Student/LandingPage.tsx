import Banner from "../../components/Banner";
import { Text } from "@chakra-ui/react";

export default function LandingPage(){
    return(<>
        <Banner title='SEC Company Queue'></Banner>
        <Text>Find a company and scan their company queue QR to join a queue</Text>
    </>);
}