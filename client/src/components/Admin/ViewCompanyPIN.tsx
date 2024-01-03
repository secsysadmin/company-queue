import { Box, Card, CardHeader, Select } from "@chakra-ui/react";
import { useState } from "react";

export default function ViewCompanyPIN(props: {
  companyArray: { name: string; pin: string }[];
}) {
  const [company, setCompany] = useState("");

  return (
    <Card width={"65vw"}>
      <CardHeader>View Company PIN</CardHeader>
      <Select
        placeholder="Company Name"
        onChange={(ev) => setCompany(ev.target.value)}
      >
        {props.companyArray?.map((company, index) => (
          <option value={company.pin} key={index}>
            {company.name}
          </option>
        ))}
      </Select>
      <Box style={{ background: "white", padding: "16px" }}>
        PIN: {company}
      </Box>
    </Card>
  );
}
