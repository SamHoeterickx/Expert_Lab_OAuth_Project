import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { clsx } from "clsx";

//Components
import { AuthProviderButton } from "../../../shared/components/authProviderButton/AuthProviderButton.jsx"

//Styles
import styles from "./login.module.scss";

export const Login = () => {

    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    });
    const [statusCode, setStatusCode] = useState(undefined);
    const [errorMessage, setErrorMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const nav = useNavigate();
    const form = useRef();

    const handleInputfield = (field, value) => {
        setLoginForm(prev => (
            {
                ...prev,
                [field]: value
            }
        ))
    }
    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!form.current) return

        fetch('http://localhost:8080/api/users/login', {
            method: 'POST',
            credentials: "include",
            body: JSON.stringify({
                email: loginForm.email,
                password: loginForm.password
            }),
            headers: {
                'Content-type': "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            setIsLoading(false);
            console.log(data);

            if(data.status === 200){
                setStatusCode(200);
                setErrorMessage(false);
                nav('/');
                return
            }

            if(data.status !== 200){
                setStatusCode(data.status);
                setErrorMessage(data.message);
                return
            }

        });
    }

    return (
        <>
            {
                !isLoading && (
                   <section className={clsx(styles["login-wrapper"])}>
                        <h2>Login To See Your Taxes</h2>

                        <form
                            ref={form}
                            onSubmit={handleLogin}
                            className={clsx(styles["login-wrapper--form-wrapper"])}
                        >
                            <div className={clsx(styles["login-wrapper--form-wrapper--input-field"])}>
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                onChange={e => handleInputfield('email', e.target.value)}
                            />
                            </div>

                            <div className={clsx(styles["login-wrapper--form-wrapper--input-field"])}>
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                onChange={e => handleInputfield('password', e.target.value)}
                            />
                            </div>

                            <input type="submit" value="Login" />

                            {statusCode !== 201 && errorMessage !== false && (
                            <span>{statusCode} - {errorMessage}</span>
                            )}
                        </form>

                        <div className={clsx(styles["auth-provider-button-wrapper"])}>
                            <AuthProviderButton />
                        </div>

                        <Link to="/register" className={clsx(styles["register-link"])}>Register</Link>
                    </section>

                )
            }

            {
                isLoading && <h2>Loading...</h2>
            }
        </>
    )
}