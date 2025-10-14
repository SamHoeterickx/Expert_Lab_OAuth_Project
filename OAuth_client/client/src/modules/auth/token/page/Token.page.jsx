import { useState, useEffect} from "react";
import { useSearchParams } from "react-router-dom";

export const Token = () => {
    
    const [searchParams] = useSearchParams();
    const [urlParams, setUrlParams] = useState({
        code: undefined,
        state: undefined
    })

    useEffect(() => {
        setUrlParams({
            code: searchParams.get('code'),
            state: searchParams.get('state')
        })
    }, [searchParams]);


    useEffect(() => {
        fetch(`http://localhost:3000/api/oauth/token`, {
            method: 'POST',
            headers: {
                'Content-type': "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({
                grant_type: "authorization_code",
                code: urlParams.code,
                client_id: import.meta.env.VITE_CLIENT_ID,
                client_secret: import.meta.env.VITE_CLIENT_SECRET,
                redirect_uri: encodeURIComponent(import.meta.env.VITE_REDIRECT_URI)
            })
        })
        .then(response => response.json())
        .then(data => {
            //IF 200 -> get user info 
            // IF 200 -> save user info in database
            //CHECK LOGIN 
        })
    })

    return(
        <h1> Token </h1>
    )
}