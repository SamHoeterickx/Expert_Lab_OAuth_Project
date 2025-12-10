import { clsx } from "clsx";
import styles from "./authProviderButton.module.scss";

export const AuthProviderButton = () => {

    const handleClick = (e) => {
        e.preventDefault();

        const client_id = import.meta.env.VITE_CLIENT_ID;
        const redirect_uri = encodeURIComponent(import.meta.env.VITE_REDIRECT_URI);

        const backendUrl = "https://expert-lab-oauth-project-client.onrender.com"; 

        fetch(`${backendUrl}/api/oauth/auth?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}`, {
            headers: { 'Content-type': "application/json" },
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                // Toon de echte fout als het misgaat, in plaats van te crashen op JSON
                return response.text().then(text => { throw new Error(text) });
            }
            return response.json();
        })
        .then(data => {
            console.log("Redirecting to:", data.redirectUrl); // Debugging
            window.location.href = data.redirectUrl;
        })
        .catch(err => console.error("Fout bij ophalen auth URL:", err));
    }

    return (
        <button
            className={clsx(styles["auth-provider-button"])}
            onClick={handleClick}
        >
            Login met itsyou
        </button>
    )
}
