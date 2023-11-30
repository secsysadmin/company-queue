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
        companiesArray.push({ name: companies[i].name, id: companies[i]._id });
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

export function getCookie(name: String) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

export function deleteCookie(name: String) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
}
