import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const AuthConsent = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const nav = useNavigate();

    const [urlParams, seturlParams] = useState({
        response_type: '',
        client_id: '',
        redirect_uri: '',
        state: ''
    });

    useEffect(() => {
        console.log(searchParams);
        // console.log(`Code: ${searchParams.get('code')}`);
        seturlParams({
            response_type: searchParams.get('response_type'),
            client_id: searchParams.get('client_id'),
            redirect_uri: searchParams.get('redirect_uri'),
            state: searchParams.get('state')
        })
    }, [searchParams])

    
    return (
        <h1>Consent access</h1>
    )
}