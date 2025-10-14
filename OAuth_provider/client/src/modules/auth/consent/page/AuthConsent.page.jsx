import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const AuthConsent = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const [urlParams, seturlParams] = useState({
        response_type: '',
        client_id: '',
        redirect_uri: '',
        state: ''
    });
    const [clientInfo, setClientInfo] = useState({
        client_name: false,
        scope: false
    })

    useEffect(() => {
        console.log(searchParams);
        // console.log(`Code: ${searchParams.get('code')}`);
        seturlParams({
            response_type: searchParams.get('response_type'),
            client_id: searchParams.get('client_id'),
            redirect_uri: searchParams.get('redirect_uri'),
            state: searchParams.get('state')
        })
    }, [searchParams]);

    useEffect(() => {
        fetch(`http://localhost:3000/api/oauth/get-client-info?client_id=${searchParams.get('client_id')}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setClientInfo({
                client_name: data.data.client.client_name,
                scope: data.data.client.scope
            })
        })
    }, [searchParams])

    const handleApprove = (e) => {
        e.preventDefault();

        console.log(urlParams)

        fetch(`http://localhost:3000/api/oauth/consent`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify({
                client_id: urlParams.client_id,
                redirect_uri: urlParams.redirect_uri,
                state: urlParams.state,
                approved: true
            }),
        })
        .then(response => response.json())
        .then(data => window.location.href = decodeURIComponent(data.redirectUrl));
    }

    const handleDeny = (e) => {
        e.preventDefault();

        console.log(urlParams);

        fetch(`http://localhost:3000/api/oauth/consent`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify({
                client_id: urlParams.client_id,
                redirect_uri: urlParams.redirect_uri,
                state: urlParams.state,
                approved: false
            }),
        })
        .then(response => response.json())
        .then(data => window.location.href = data.redirectUrl);
    }

    return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
            <h1>Toestemming nodig</h1>
            <p>
                {   clientInfo.client_name &&
                    clientInfo.client_name
                } 
                Wil toegang tot:
            </p>

            <ul>
                {
                    clientInfo.scope && clientInfo.scope.map(item => <li>{item}</li>)
                }
            </ul>

            <div style={{ marginTop: "1.5rem" }}>
                <button
                    onClick={handleApprove}
                    style={{
                        padding: "0.5rem 1rem",
                        marginRight: "1rem",
                        backgroundColor: "#4caf50",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Sta toe
                </button>
                <button
                    onClick={handleDeny}
                    style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "#f44336",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Weiger
                </button>
            </div>
        </div>
    )
}