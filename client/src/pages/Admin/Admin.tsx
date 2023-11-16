import NewCompany from "../../components/Admin/NewCompany";
import NewQueue from "../../components/Admin/NewQueue";
import Banner from "../../components/Banner";
import { useEffect, useState } from "react";
import { getCompanyNames } from "../../utils/utils";

export default function Admin() {
    const [companyNames, setCompanyNames] = useState<string[]>();

    useEffect(() => {
        getCompanyNames().then((res) => {
            setCompanyNames(res);
        })
    }, []);

    return (<>
        <Banner title='Admin Panel'></Banner>
        {/*@ts-ignore*/}
        <div style={statusDivStyle}>
            <NewCompany />
            <NewQueue companyNames={companyNames} />
        </div>
    </>);
}

const statusDivStyle = {
    marginTop: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};