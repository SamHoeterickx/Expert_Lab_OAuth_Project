import { useState, useRef } from "react";
import clsx from 'clsx';

//Style
import styles from './registerOauth.module.scss';

export const RegisterOauth = () => {

    const [formData, setFormData] = useState({
        client_name: undefined,
        owner_email: undefined,
        client_uri: undefined,
        redirect_uri: undefined,
        scope: []
    })

    const formRef = useRef();

    const handleFormSubmition = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/api/oauth/register_client', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => console.log(data));
    }

    const handleInputfield = (field, value) => {
        setFormData(prev => (
            {
                ...prev,
                [field]: value
            }
        ))
    }
    
    const handleScopeChange = (e) => {
        const { value, checked } = e.target;
        
        setFormData(prev => {
            let newScopes = [...prev.scope]; 

            if (checked) {
                newScopes.push(value);
            } else {
                newScopes = newScopes.filter(scope => scope !== value);
            }

            return {
                ...prev,
                scope: newScopes
            };
        });
    }
    
 
    return(
        <section className={clsx(styles["register-oauth-wrapper"])}>
            <h2>Register OAuth Client</h2>

            <form
                ref={formRef}
                onSubmit={handleFormSubmition}
                className={clsx(styles["register-oauth-form"])}
            >
                <div className={clsx(styles["register-oauth-form--input-field"])}>
                    <label htmlFor="client_name">Name</label>
                    <input
                        type="text"
                        id="client_name"
                        onChange={e => handleInputfield('client_name', e.target.value)}
                    />
                </div>

                <div className={clsx(styles["register-oauth-form--input-field"])}>
                    <label htmlFor="owner_email">Owner Email</label>
                    <input
                        type="email"
                        id="owner_email"
                        onChange={e => handleInputfield('owner_email', e.target.value)}
                    />
                </div>

                <div className={clsx(styles["register-oauth-form--input-field"])}>
                    <label htmlFor="redirect_uri">Redirect URL</label>
                    <input
                        type="url"
                        id="redirect_uri"
                        onChange={e => handleInputfield('redirect_uri', e.target.value)}
                    />
                </div>

                <div className={clsx(styles["register-oauth-form--input-field"])}>
                    <label htmlFor="client_uri">Base Website URL</label>
                    <input
                        type="url"
                        id="client_uri"
                        onChange={e => handleInputfield('client_uri', e.target.value)}
                    />
                </div>

                <div className={clsx(styles["register-oauth-form--scope-section"])}>
                    <label>Scope</label>
                    <div className={clsx(styles["scope-options"])}>
                        {
                            ["profile", "openid", "email", "phone", "address"].map(scope => (
                                <label key={scope}>
                                    <input
                                    type="checkbox"
                                    value={scope}
                                    onChange={handleScopeChange}
                                />
                                    {scope.charAt(0).toUpperCase() + scope.slice(1)}
                                </label>
                            ))
                        }
                    </div>
                </div>

                <input type="submit" value="Next" />
            </form>
        </section>
    );
}