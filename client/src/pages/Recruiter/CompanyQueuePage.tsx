import Banner from "../../components/Banner";
import {
  Stack,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Card,
  CardHeader,
  CardBody,
  Button
} from "@chakra-ui/react";

const tableCellStyle = {
  padding: '8px',
  margin: '0',
};

export default function RecruiterDashboard() {
  const company = "Tesla";
  return (
    <>
      <Banner title='Company Queue for Recruiters'></Banner>
       {/*@ts-ignore*/}
      <div style={statusDivStyle}>

        <Stack>
          <Heading>{company}'s Line(s)</Heading>
          <Card backgroundColor={"blackAlpha.100"}>
            <CardHeader>
              <Heading size={'md'}>All Majors Line
                <div style={{ float: 'right' }}>
                  <Button colorScheme='red' size='sm'>Close Queue</Button>
                </div>
              </Heading>
            </CardHeader>
            <CardBody>
              <TableContainer>
                <Table variant='striped' colorScheme='blackAlpha' style={{ margin: '0', padding: '0' }}>
                  <Thead>
                    <Tr>
                      <Th style={tableCellStyle}>#</Th>
                      <Th style={tableCellStyle}>Major</Th>
                      <Th style={tableCellStyle}>Name</Th>
                      <Th style={tableCellStyle}>Remove</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td style={tableCellStyle}>1</Td>
                      <Td style={tableCellStyle}>CPSC</Td>
                      <Td style={tableCellStyle}>John Smith</Td>
                      <Td style={tableCellStyle}><Button colorScheme='red' size='sm'>Remove</Button></Td>
                    </Tr>
                    <Tr>
                      <Td style={tableCellStyle}>2</Td>
                      <Td style={tableCellStyle}>MEEN</Td>
                      <Td style={tableCellStyle}>Allie Grater</Td>
                      <Td style={tableCellStyle}><Button colorScheme='red' size='sm'>Remove</Button></Td>
                    </Tr>
                    <Tr>
                      <Td style={tableCellStyle}>3</Td>
                      <Td style={tableCellStyle}>ELEN</Td>
                      <Td style={tableCellStyle}>Gene Eva Convenshun</Td>
                      <Td style={tableCellStyle}><Button colorScheme='red' size='sm'>Remove</Button></Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </CardBody>
          </Card>
        </Stack>
      </div>
    </>
  );
}

const statusDivStyle = {
  marginTop: '1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};
