import { Box, Center, Text } from "@chakra-ui/react";
import Banner from "../components/Banner";

export default function ErrorPage() {
  return (
    <Box textAlign="center">
      <Banner title="Page Not Found" />
      <Center mt={"2vh"} marginRight={"6vw"} marginLeft={"6vw"}>
        <Text fontSize="xl" color="gray.600">
          Sorry, the page you are looking for could not be found.
        </Text>
      </Center>
    </Box>
  );
}
