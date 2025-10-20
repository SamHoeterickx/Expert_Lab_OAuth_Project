import { clsx } from "clsx";
import styles from "./authProviderButton.module.scss";

export const AuthProviderButton = () => {

    const handleClick = (e) => {
        e.preventDefault();

        const client_id = import.meta.env.VITE_CLIENT_ID;
        const redirect_uri = encodeURIComponent(import.meta.env.VITE_REDIRECT_URI);

        fetch(`http://localhost:8080/api/oauth/auth?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}`, {
            headers: { 'Content-type': "application/json" },
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            window.location.href = data.redirectUrl;
        });
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
