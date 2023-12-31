import { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@chakra-ui/react";

import Banner from "../../components/Banner";
import AddNewCompanyForm from "../../components/Admin/AddNewCompanyForm";
import AddNewQueueForm from "../../components/Admin/AddNewQueueForm";
import QRCodeDisplayer from "../../components/Admin/QRCodeDisplayer";

export default function Admin() {
  const [companies, setCompanies] = useState<{ name: string; id: string }[]>();

  useEffect(() => {
    axios.get("/company").then((res) => {
      const companies = res.data.map((company: any) => {
        return { name: company.name, id: company._id };
      });

      setCompanies(companies);
    });
  }, []);

  return (
    <>
      <Banner title="Admin Panel"></Banner>
      <Box sx={statusDivStyle}>
        <AddNewCompanyForm />
        <hr
          style={{
            marginTop: "10px",
            borderColor: "white",
            borderTopWidth: "50px",
            width: "50vw",
          }}
        />
        <AddNewQueueForm companyArray={companies!} />
        <hr
          style={{
            marginTop: "10px",
            borderColor: "white",
            borderTopWidth: "50px",
            width: "50vw",
          }}
        />
        <QRCodeDisplayer companyArray={companies!} />
      </Box>
    </>
  );
}

const statusDivStyle = {
  marginTop: "1rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
