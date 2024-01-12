import React, { useState } from "react";
import {
    Card,
    CardHeader,
    Select,
    Button,
    useToast,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";

export default function RemoveCompanyForm(props: {
    companyArray: { name: string; id: string }[];
}) {
    const [selectedCompany, setSelectedCompany] = useState("");
    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef(null);

    const handleRemoveCompany = async () => {
        try {
            if (selectedCompany) {
                await axios.delete(`/company/id/${selectedCompany}`);
                toast({
                    title: "Company removed successfully",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Please select a company to remove",
                    status: "warning",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            toast({
                title: "Failed to remove company",
                description: "Please refresh or try again",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Card width={"65vw"}>
            <CardHeader>Remove Company</CardHeader>
            <Select
                placeholder="Select Company"
                onChange={(ev) => setSelectedCompany(ev.target.value)}
            >
                {props.companyArray?.map((company, index) => (
                    <option value={company.id} key={index}>
                        {company.name}
                    </option>
                ))}
            </Select>
            <Button
                colorScheme="red"
                size="sm"
                marginTop="2"
                onClick={onOpen}
            >
                Remove Company
            </Button>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Remove Company
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={() => {
                                    handleRemoveCompany();
                                    onClose();
                                }}
                                ml={3}
                            >
                                Remove
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Card>
    );
}
