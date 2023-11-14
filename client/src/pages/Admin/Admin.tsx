import NewCompany from "../../components/Admin/NewCompany";
import Banner from "../../components/Banner";

export default function Admin() {
    return (<>
        <Banner title='Admin Panel'></Banner>
        <NewCompany/>
    </>);
}