import { useState, useRef } from "react";
import clsx from 'clsx';

//Style
import styles from './registerOauth.module.scss';
import { RegisterOAuthForm } from "../components/RegisterOAuthForm";
import { OAuthData } from "../components/OAuthData";

export const RegisterOauth = () => {

    const [formData, setFormData] = useState({
        client_name: undefined,
        owner_email: undefined,
        client_uri: undefined,
        redirect_uri: undefined,
        scope: []
    });
    const [oauthData, setOauthData] = useState({
        client_id: undefined,
        client_secret: undefined
    });
    const [isRegisterSuccessFull, setIsRegisterSuccessfull] = useState(false);

    const formRef = useRef();

    const handleFormSubmition = (e) => {
        e.preventDefault();
        fetch('https://expert-lab-oauth-project.onrender.com/api/oauth/register_client', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if(data.status === 201){
                setIsRegisterSuccessfull(true);
                setOauthData({
                    client_id: data.client_id,
                    client_secret: data.client_secret
                })
            }
        });
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
        <>
            {
                !isRegisterSuccessFull ? (
                    <RegisterOAuthForm
                        formRef={formRef}
                        handleFormSubmition={handleFormSubmition}
                        handleInputfield={handleInputfield}
                        handleScopeChange={handleScopeChange}
                    />
                ) : (
                    <OAuthData
                        client_id={oauthData.client_id}
                        client_secret={oauthData.client_secret}
                        redirect_uri={formData.redirect_uri}
                        base_uri={formData.base_uri}
                        scope={formData.scope}
                    />
                )
            }
        </>
    );
}