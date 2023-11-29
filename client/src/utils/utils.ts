import { SERVER_ENDPOINT } from "./consts";


export const getCompanyNames = async () => {
    const url = `${SERVER_ENDPOINT}/api/company`;
    const companies = await fetch(url).then((res) => {
        return res.json();
    }).then((val) => {
        return val;
    }).catch((reason) => console.error(reason));
    const companyNames: string[] = [];
    const companyIDs: string[] = [];
    const companiesArray: { name: string, id: string }[] = [];
    for (let i = 0; i < companies?.length; i++) {
        companyNames.push(companies[i].name);
        companyIDs.push(companies[i]._id);
        companiesArray.push({name: companies[i].name, id: companies[i]._id});
    }

    return companiesArray;
}

export function setCookie(name: string, value: string, hours: number) {
    var expires = "";
    if (hours) {
        var date = new Date();
        date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}