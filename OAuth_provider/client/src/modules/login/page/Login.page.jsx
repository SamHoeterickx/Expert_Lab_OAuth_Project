import { useRef, useState } from "react";

export const Login = () => {

    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    });

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

        if (!form.current) return

        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            body: JSON.stringify({
                email: loginForm.email,
                password: loginForm.password
            }),
            headers: {
                'Content-type': "application/json"
            }
        });
    }

    return (
        <>
            <h2>Login</h2>
            <form 
                ref={ form }
                onSubmit={ handleLogin }
            >
                <input type="email" name="email" onChange={ e => handleInputfield('email', e.target.value) }  />
                <input type="password" name="email" onChange={ e => handleInputfield('password', e.target.value) }  />
                <input type="submit" value="login" />
            </form> 
        </>
    )
}