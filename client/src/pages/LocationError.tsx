import { Box, Center, Text } from "@chakra-ui/react";
import Banner from "../components/Banner";

export default function ErrorPage() {
    return (
        <Box textAlign="center">
            <Banner title="Location Error" />
            <Center mt={"2vh"} marginRight={"6vw"} marginLeft={"6vw"}>
                <Text fontSize="xl" color="gray.600">
                    Please make sure you are at the Career Fair and have location services enabled to use Company Queue.
                </Text>
            </Center>
        </Box>
    );
}
