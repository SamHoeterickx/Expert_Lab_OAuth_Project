import clsx from 'clsx'
import { useRef } from 'react'

//Style
import styles from '../page/registerOauth.module.scss';

export const RegisterOAuthForm = ({ formRef, handleFormSubmition, handleInputfield, handleScopeChange }) => {
    return (
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
    )
}