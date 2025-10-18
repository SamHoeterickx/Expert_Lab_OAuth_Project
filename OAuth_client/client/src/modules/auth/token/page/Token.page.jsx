import { useState, useEffect} from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export const Token = () => {
    
    const [searchParams] = useSearchParams();
    const [urlParams, setUrlParams] = useState({
        code: undefined,
        state: undefined
    });
    const [tokenData, setTokenData] = useState({
        accessToken: undefined,
        token_type: undefined,
    });
    const [clientData, setClientData] = useState({
        client_name: undefined,
        scope: undefined
    })
    const [userData, setUserData] = useState();

    const nav = useNavigate();

    useEffect(() => {
        setUrlParams({
            code: searchParams.get('code'),
            state: searchParams.get('state')
        });
    }, [searchParams]);


    useEffect(() => {
        fetch(`https://expert-lab-oauth-project.onrender.com/api/oauth/token`, {
            method: 'POST',
            headers: {
                'Content-type': "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({
                grant_type: "authorization_code",
                code: searchParams.get('code'),
                client_id: import.meta.env.VITE_CLIENT_ID,
                client_secret: import.meta.env.VITE_CLIENT_SECRET,
                redirect_uri: encodeURIComponent(import.meta.env.VITE_REDIRECT_URI)
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            //IF 200 -> get user info 
            if(data.status === 200){
                setTokenData({
                    accessToken: data.data.access_token,
                    token_type: data.data.token_type
                });
                handleGetUserInfo(data.data.access_token);
            }
        })
    }, [])

    const handleGetUserInfo = (accessToken) => {

        const client_id = import.meta.env.VITE_CLIENT_ID

        fetch(`https://expert-lab-oauth-project.onrender.com/api/oauth/get-client-info?client_id=${client_id}`, {
            method: 'GET',
            headers: {
                'Content-type': "application/json",
            },
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setClientData({
                client_name: data.data.client.client_name,
                scope: data.data.client.scope
            });
            getUserInfo(accessToken);
        })

    }

    const getUserInfo = (accessToken) => {
        fetch(`https://expert-lab-oauth-project.onrender.com/api/users/userinfo`, {
            headers: {
                'Content-type': "application/json",
                "authorization": `Bearer ${accessToken}`
            },
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setUserData(data.data);
            saveUserInfo(data);
        });
    }

    const saveUserInfo = (data) => {
        fetch(`http://localhost:8080/api/users/add-oauth-user`, {
            method: 'POST',
            headers: {
                'Content-type': "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })
        .then(respone => respone.json())
        .then(data => {
            if(data.status === 201){
                window.location.href = import.meta.env.VITE_REDIRECT_AFTER_TOKEN;
            }else if(data.status !== 201){
                nav('/login') ;
            }
            console.log("data", data);
        })
    }

    return(
        <h1> Token </h1>
    )
}