import Banner  from "../../components/Banner";
import { Stack, 
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
    Button } from "@chakra-ui/react";

    const tableCellStyle = {
        padding: '8px',
        margin: '0',
      };
      
      export default function RecruiterDashboard() {
        const company = "Tesla";
        return (
          <>
            <Banner title='Company Queue for Recruiters'></Banner>
            {/* @ts-ignore */}
            <div style={statusDivStyle}>
              <Stack>
                <Heading>{company}</Heading>
                <Card backgroundColor={"blackAlpha.100"}>
                  <CardHeader>
                    <Heading size={'md'}>Your lines
                      <div style={{ float: 'right' }}>
                        <Button colorScheme='red' size='sm'>Close All Queues</Button>
                      </div>
                    </Heading>
                  </CardHeader>
                  <CardBody>
                    <TableContainer>
                      <Table variant='striped' colorScheme='blackAlpha' style={{ margin: '0', padding: '0' }}>
                        <Thead>
                          <Tr>
                            <Th style={tableCellStyle}>Queue Major</Th>
                            <Th style={tableCellStyle}>Length</Th>
                            <Th style={tableCellStyle}>View</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr>
                            <Td style={tableCellStyle}>ALL MAJORS</Td>
                            <Td style={tableCellStyle}>128</Td>
                            <Td style={tableCellStyle}><Button colorScheme='green' size='sm'>View</Button></Td>
                          </Tr>
                          <Tr>
                            <Td style={tableCellStyle}>CPSC</Td>
                            <Td style={tableCellStyle}>78</Td>
                            <Td style={tableCellStyle}><Button colorScheme='green' size='sm'>View</Button></Td>
                          </Tr>
                          <Tr>
                            <Td style={tableCellStyle}>MEEN</Td>
                            <Td style={tableCellStyle}>45</Td>
                            <Td style={tableCellStyle}><Button colorScheme='green' size='sm'>View</Button></Td>
                          </Tr>
                          <Tr>
                            <Td style={tableCellStyle}>ELEN</Td>
                            <Td style={tableCellStyle}>63</Td>
                            <Td style={tableCellStyle}><Button colorScheme='green' size='sm'>View</Button></Td>
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