import { Card, Text, Input, Button, Stack, CardHeader, Select, Checkbox } from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface NewQueueProps {
    companyNames?: string[];
}

export default function NewQueue(props: NewQueueProps) {
    const [companyName, setCompanyName] = useState('');
    const [majors, setMajors] = useState<string[]>([]);
    const [canSubmit, setCanSubmit] = useState(false);

    const majorOptions = ["AERO", "AREN", "BAEN", "BMEN", "CHEN", "CVEN", "CSCE", "CPEN", "ECEN", "EVEN", "ESET", "ISEN", "IDIS", "MSEN", "MEEN", "NUEN", "OCEN", "PETE"];

    useEffect(() => {
        setCanSubmit(companyName.length > 0 && majors.length > 0);
    }, [companyName]);

    const handleMajorChange = (checked: boolean, major: string) => {
        if (checked) {
            setMajors(prevMajors => [...prevMajors, major]);
        } else {
            setMajors(prevMajors => prevMajors.filter(m => m !== major));
        }
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <Text size={'lg'}>Add a new queue</Text>
                </CardHeader>
                <Stack>
                    <Select placeholder="Company Name" onChange={(ev) => setCompanyName(ev.target.value)}>
                        {/* Add options for company names here */}
                        {
                            props.companyNames?.map((company, index) => (
                                <option value={company} key={index}>{company}</option>
                            ))
                        }
                    </Select>

                    {majorOptions.map((major, index) => (
                        <Checkbox
                            key={index}
                            value={major}
                            onChange={(e) => handleMajorChange(e.target.checked, major)}
                        >
                            {major}
                        </Checkbox>
                    ))}

                    <Button backgroundColor={'red.900'} color='white' isDisabled={!canSubmit}>Submit</Button>
                </Stack>
            </Card>
        </div>
    );
}
