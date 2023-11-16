import { SERVER_ENDPOINT } from "./consts";


export const getCompanyNames = async () => {
    const url = `${SERVER_ENDPOINT}/api/company`;
    const companies = await fetch(url).then((res) => {
        return res.json();
    }).then((val) => {
        return val;
    }).catch((reason) => console.error(reason));
    const companyNames: string[] = [];
    for (let i = 0; i < companies?.length; i++) {
        companyNames.push(companies[i].name);
    }   

    return companyNames;
}