import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from './utils';

export default function useRecruiterLogin() {
    const [companyID, setCompanyID] = useState<string>();

    const navigate = useNavigate();
    useEffect(() => {
        const id = getCookie('companyID');
        if (id == null) {
            navigate('/recruiter/login');
        }
        else {
            setCompanyID(id);
        }
    }, []);
    return {companyID};
}