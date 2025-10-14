import { useRef, useState } from "react";
import { clsx } from "clsx";
import { Link, useNavigate } from "react-router-dom";


//Styles
import styles from "./register.module.scss";

export const Register = () => {

    const [registerForm, setRegisterForm] = useState({
        name: "",
        email: "",
        password: "",
        repeatPassword: ""
    });
    const [statusCode, setStatusCode] = useState(undefined);
    const [errorMessage, setErrorMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const nav = useNavigate();
    const form = useRef();

    const handleInputfield = (field, value) => {
        setRegisterForm(prev => (
            {
                ...prev,
                [field]: value
            }
        ))
    }
    const handleRegister = (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!form.current) return

        fetch('http://localhost:8080/api/users/register', {
            method: 'POST',
            credentials: "include",
            body: JSON.stringify({
                name: registerForm.name,
                email: registerForm.email,
                password: registerForm.password,
                repeatPassword: registerForm.repeatPassword
            }),
            headers: {
                'Content-type': "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            setIsLoading(false);
            console.log(data);

            if(data.status === 201){
                setStatusCode(201);
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
                    <section className={clsx(styles["register-wrapper"])}>
                        <h2>Register</h2>
                        <form 
                            className={clsx(styles["register-wrapper--form-wrapper"])}
                            ref={ form }
                            onSubmit={ handleRegister }
                        >
                            <div className={clsx(styles["register-wrapper--form-wrapper--input-field"])}>
                                <label>Name</label>
                                <input type="text" name="name" onChange={ e => handleInputfield('name', e.target.value) }  />
                            </div>
                            <div className={clsx(styles["register-wrapper--form-wrapper--input-field"])}>
                                <label>Email</label>
                                <input type="email" name="email" onChange={ e => handleInputfield('email', e.target.value) }  />
                            </div>
                            <div className={clsx(styles["register-wrapper--form-wrapper--input-field"])}>
                                <label>Password</label>
                                <input type="password" name="password" onChange={ e => handleInputfield('password', e.target.value) }  />
                            </div>
                            <div className={clsx(styles["register-wrapper--form-wrapper--input-field"])}>
                                <label>Repeat Password</label>
                                <input type="password" name="repeatPassword" onChange={ e => handleInputfield('repeatPassword', e.target.value) }  />
                            </div>
                            <input type="submit" value="Register" />
                            {
                                statusCode !== 201 && errorMessage !== false && (
                                    <span>{statusCode} - {errorMessage}</span>
                                ) 
                            }
                        </form> 
                        <Link to={"/login"} >Login</Link>
                    </section>
                )
            }

            {
                isLoading && <h2>Loading...</h2>
            }
        </>
    )
}