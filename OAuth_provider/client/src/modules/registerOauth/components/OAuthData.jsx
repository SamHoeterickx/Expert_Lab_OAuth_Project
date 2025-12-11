import { clsx } from "clsx";
import { Link } from 'react-router-dom';
//Styles
import styles from "../page/registerOauth.module.scss";

//Routes
import { HOME_ROUTE } from "../../home/home.route";

const FUNCTION = `
    const handleClick = (e) => {
        e.preventDefault();

        const client_id = import.meta.env.VITE_CLIENT_ID;
        const redirect_uri = encodeURIComponent(import.meta.env.VITE_REDIRECT_URI);
        const backendUrl = "https://expert-lab-oauth-project-client.onrender.com"; 

        fetch(\`\${backendUrl}/api/oauth/auth?client_id=\${client_id}&redirect_uri=\${encodeURIComponent(redirect_uri)}\`, {
            headers: { 'Content-type': "application/json" },
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                // Toon de echte fout als het misgaat
                return response.text().then(text => { throw new Error(text) });
            }
            return response.json();
        })
        .then(data => {
            console.log("Redirecting to:", data.redirectUrl);
            window.location.href = data.redirectUrl;
        })
        .catch(err => console.error("Fout bij ophalen auth URL:", err));
    }
`;

export const OAuthData = ({ client_id, client_secret, redirect_uri, base_uri, scope }) => {

    const scopeList = Array.isArray(scope) 
        ? scope 
        : (typeof scope === 'string' ? scope.split(' ') : []);

    return (
        <section className={clsx(styles["oauth-data-wrapper"])}>
            <h3>OAuth Client Details</h3>
            <label>Add this function to the login with ItsYou button</label>

            <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflowX: 'auto' }}>
                <code>
                    {FUNCTION}
                </code>
            </pre>

            <label>Add these variables to your env file and update name giving in the function if necessary</label>

            <p>
                <strong>Client ID</strong>
                {client_id || "—"}
            </p>

            <p>
                <strong>Client Secret</strong>
                {client_secret || "—"}
            </p>

            <p>
                <strong>Redirect URI</strong>
                {redirect_uri || "—"}
            </p>

            <p>
                <strong>Base URI</strong>
                {base_uri || "Your website base url"}
            </p>

            <div>
                <strong>Scope</strong>
                <div className={clsx(styles["scope-list"])}>
                    {
                        scopeList.length > 0 ? (
                            scopeList.map((s) => (
                            <span key={s} className={clsx(styles["scope-item"])}>
                                {s}
                            </span>
                            ))
                        ) : (
                            <span className={clsx(styles["scope-item"])}>None</span>
                        )
                    }
                </div>
            </div>
            <Link to={`/${HOME_ROUTE.path}`} className={clsx(styles["link-button"])}>
                Home
            </Link>
        </section>
    );
};