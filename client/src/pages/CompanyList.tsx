import { useEffect, useState } from "react";

import { Box, Flex, Text } from "@chakra-ui/react";

import { Company } from "../types/company";

const CompanyList = () => {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/company")
      .then(res => res.json())
      .then(data => setCompanies(data));
  }, []);

  return (
    <Box
      gap={4}
      p={"2rem"}>
      <Text
        fontSize={"4xl"}
        fontWeight={"bold"}
        mb={"1rem"}>
        All Companies
      </Text>
      {companies.map(company => (
        <Box
          key={company.name}
          maxW='md'
          borderWidth='1px'
          borderRadius='lg'
          overflow='hidden'>
          <Box p={4}>
            <Text
              fontSize='xl'
              fontWeight='bold'>
              {company.name}
            </Text>
            <Text fontSize='md'>Booth: {company.booth}</Text>
            <Text
              mt={2}
              fontWeight='bold'>
              Company Lines:
            </Text>
            {company.companyLines.map(companyLine => (
              <Text key={companyLine.lineNumber}>
                {companyLine.lineNumber} - {companyLine.majors.join(", ")}
              </Text>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default CompanyList;
