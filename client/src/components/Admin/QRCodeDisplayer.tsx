import { Box, Card, CardHeader, Select } from "@chakra-ui/react";
import { useState } from "react";
import QRCode from "react-qr-code";

export default function QRCodeDisplayer(props: {
  companyArray: { name: string; id: string }[];
}) {
  const [company, setCompany] = useState("");

  const generateCompanyURL = (companyName: string) => {
    return (
      window.location.origin + "/student/join-queue?company=" + companyName
    );
  };

  return (
    <Card width={"65vw"}>
      <CardHeader>Display QR Code</CardHeader>
      <Select
        placeholder="Company Name"
        onChange={(ev) => setCompany(ev.target.value)}
      >
        {props.companyArray?.map((company, index) => (
          <option value={company.name} key={index}>
            {company.name}
          </option>
        ))}
      </Select>
      <Box style={{ background: "white", padding: "16px" }}>
        <QRCode value={generateCompanyURL(company)} />
        {generateCompanyURL(company)}
      </Box>
    </Card>
  );
}
