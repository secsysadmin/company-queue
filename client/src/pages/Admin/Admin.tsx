import NewCompany from "../../components/Admin/NewCompany";
import NewQueue from "../../components/Admin/NewQueue";
import Banner from "../../components/Banner";

export default function Admin() {
    return (<>
        {/*@ts-ignore*/}

        <div style={statusDivStyle}>

            <Banner title='Admin Panel'></Banner>
            <NewCompany />
            <NewQueue /></div>
    </>);
}

const statusDivStyle = {
    marginTop: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};