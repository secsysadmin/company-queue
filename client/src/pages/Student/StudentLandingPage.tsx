import { Box, Text } from "@chakra-ui/react";

import Banner from "../../components/Banner";

export default function StudentLandingPage() {
  return (
    <>
    <Banner title="Company Queue"></Banner>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="90vh"
      >
        <Text textAlign="center" fontSize="lg">
          Find a participating company and scan their company queue QR to join a queue.<br/><br/>If you have been redirected here after joining a queue, you are in the queue and will recieve a text when it is your turn in line.
        </Text>
      </Box>
    </>
  );
}
