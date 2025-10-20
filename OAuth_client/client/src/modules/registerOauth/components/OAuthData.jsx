import { clsx } from "clsx";
import { Link } from 'react-router-dom'
//Styles
import styles from "../page/registerOauth.module.scss";

//Routes
import { HOME_ROUTE } from "../../home/home.route";

export const OAuthData = ({ client_id, client_secret, redirect_uri, base_uri, scope }) => {
  return (
    <section className={clsx(styles["oauth-data-wrapper"])}>
        <h3>OAuth Client Details</h3>

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
            {base_uri || "—"}
        </p>

        <div>
            <strong>Scope</strong>
            <div className={clsx(styles["scope-list"])}>
                {
                    scope && scope.length > 0 ? (
                        scope.map((s) => (
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
        <Link to='/' className={clsx(styles["link-button"])} >Home</Link>
    </section>
  );
};
