import { useEffect, useRef, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom"
import { clsx } from "clsx"

import styles from "../../../login/page/login.module.scss"

export const AuthLogin = () => {
    
    const [searchParams, setSearchParams] = useSearchParams();
    const nav = useNavigate();

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });
    const [urlParams, seturlParams] = useState({
        response_type: '',
        client_id: '',
        redirect_uri: '',
        state: ''
    })
    const [statusCode, setStatusCode] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const form = useRef();


    useEffect(() => {
        console.log(searchParams);
        // console.log(`Code: ${searchParams.get('code')}`);
        seturlParams({
            response_type: searchParams.get('response_type'),
            client_id: searchParams.get('client_id'),
            redirect_uri: encodeURIComponent(searchParams.get('redirect_uri')),
            state: searchParams.get('state')
        })
    }, [searchParams])

    const handleLogin = (e) => {
        e.preventDefault();

        // ?response_type=${urlParams.response_type}&client_id=${urlParams.client_id}&redirect_uri=${urlParams.redirect_uri}&state=${urlParams.state}
        // response_type=code&client_id=ed123dd4dea3054139221adb9100177b&state=xyz&redirect_uri=https://localhost:5174/
        fetch(`http://localhost:3000/api/users/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify({
                email: loginForm.email,
                password: loginForm.password
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            if(data.status === 200){
                setStatusCode(200);
                setErrorMessage(false);
                handleAuthorizationEndpoint();
                return
            }

            if(data.status !== 200){
                setStatusCode(data.status);
                setErrorMessage(data.message);
                return
            }

        })
    }

    const handleInputfield = (field, value) => {
        setLoginForm( prev => (
            {
                ...prev, 
                [field]: value
            }
        ))
    }

    const handleAuthorizationEndpoint = () => {
        console.log('handleAuthorizatoinEndpoint')
        fetch(`http://localhost:3000/api/oauth/authorize?response_type=${urlParams.response_type}&client_id=${urlParams.client_id}&state=${urlParams.state}&redirect_uri=${urlParams.redirect_uri}`, {
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            if(data.status === 200){
                setStatusCode(data.status);
                return nav(`/auth/consent?response_type=${urlParams.response_type}&client_id=${urlParams.client_id}&state=${urlParams.state}&redirect_uri=${encodeURIComponent(urlParams.redirect_uri)}`);
            }

            if(data.status !== 200){
                setStatusCode(data.status);
                setErrorMessage(data.message);
            }
        })
    }

    return (
        <>
            <section className={clsx(styles["login-wrapper"])}>
                <h2>Login with your itsyou account <br /> to continue</h2>
                <form 
                    className={clsx(styles["login-wrapper--form-wrapper"])}
                    ref={ form }
                    onSubmit={ handleLogin }
                >
                    <div className={clsx(styles["login-wrapper--form-wrapper--input-field"])}>
                        <label>Email</label>
                        <input type="email" name="email" onChange={ e => handleInputfield('email', e.target.value) }  />
                    </div>
                    <div className={clsx(styles["login-wrapper--form-wrapper--input-field"])}>

                        <label>Password</label>
                        <input type="password" name="password" onChange={ e => handleInputfield('password', e.target.value) }  />
                    </div>
                    <input type="submit" value="Login" />
                    {
                        statusCode !== 201 && errorMessage !== false && (
                            <span>{statusCode} - {errorMessage}</span>
                        ) 
                    }
                </form> 
            </section>
        </>
        
    )
}