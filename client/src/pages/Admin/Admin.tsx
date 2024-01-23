import { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@chakra-ui/react";

import Banner from "../../components/Banner";
import AddNewCompanyForm from "../../components/Admin/AddNewCompanyForm";
import AddNewQueueForm from "../../components/Admin/AddNewQueueForm";
import QRCodeDisplayer from "../../components/Admin/QRCodeDisplayer";
import ViewCompanyPIN from "../../components/Admin/ViewCompanyPIN";
import RemoveCompanyForm from "../../components/Admin/RemoveCompany";
import useAdminLogin from "../../utils/useAdminLogin";

export default function Admin() {
  const [companies, setCompanies] = useState<{ name: string; pin: string; id: string }[]>();
  useAdminLogin();
  
  useEffect(() => {
    axios.get("/company").then((res) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const companies = res.data.map((company: any) => {
        return { name: company.name, pin: company.pin, id: company._id };
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
        <hr
          style={{
            marginTop: "10px",
            borderColor: "white",
            borderTopWidth: "50px",
            width: "50vw",
          }}
        />
        <RemoveCompanyForm companyArray={companies!} />
        <hr
          style={{
            marginTop: "10px",
            borderColor: "white",
            borderTopWidth: "50px",
            width: "50vw",
          }}
        />
        <QRCodeDisplayer companyArray={companies!} />
        <hr
          style={{
            marginTop: "10px",
            borderColor: "white",
            borderTopWidth: "50px",
            width: "50vw",
          }}
        />
        <ViewCompanyPIN companyArray={companies!} />
      </Box>
    </>
  );
}

const statusDivStyle = {
  marginTop: "1rem",
  marginBottom: "4rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
