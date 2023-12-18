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
        height="100vh"
      >
        <Text textAlign="center" fontSize="lg">
          Find a participating company and scan their company queue QR to join a queue
        </Text>
      </Box>
    </>
  );
}
