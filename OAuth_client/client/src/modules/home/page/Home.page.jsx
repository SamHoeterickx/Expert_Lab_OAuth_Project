import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

//Style
import styles from './home.module.scss';

//Routes
import { REGISTER_OAUTH_ROUTE } from '../../registerOauth/registerOauth.root';

export const Home = () => {

    const [userData, setUserData] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch('https://expert-lab-oauth-project-client.onrender.com/api/users/get-my-data', {
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            setIsLoading(false);
            setUserData(data.data);
            setIsLoggedIn(true);
        });
    }, []);
    
    const handleLogout = () => {
        fetch('https://expert-lab-oauth-project-client.onrender.com/api/users/logout', {
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            setUserData(undefined);
            setIsLoggedIn(false);
        })
    }

    return (
        <div className={clsx(styles["home-container"])}>
           <div className={clsx(styles["hero-header"])}>
                { userData ? <h1>Welkom {userData.name} </h1> : <h1>Welkom, ...</h1> }
                <div className={clsx(styles["button-wrapper"])}>
                    <Link to={REGISTER_OAUTH_ROUTE.path} className={clsx(styles["link-button"])}>Register Client</Link>
                    {
                        !isLoggedIn ? <Link to="/login" className={clsx(styles["link-button"])}>Login</Link> : <button onClick={ handleLogout } className={clsx(styles["link-button"])}>Logout</button>
                    }
                </div>
           </div>

            <div className={clsx(styles["dashboard"])}>
                <div className={clsx(styles["dashboard-header"])}>Mijn Fiscaal Dashboard</div>
                <div className={clsx(styles["dashboard-grid"])}>
                    {
                        userData ? (
                            <>
                                <div className={clsx(styles["dashboard-card"])}>
                                    <h3>Totale Belastingen</h3>
                                    <p>€ 12.345</p>
                                    <div className={clsx(styles["progress-bar"])}>
                                        <div className={clsx(styles["progress"])} style={{ width: '75%' }}></div>
                                    </div>
                                    <small>75% betaald</small>
                                </div>
                                <div className={clsx(styles["dashboard-card"])}>
                                    <h3>Aangifte Status</h3>
                                    <p>3 van 4 ingediend</p>
                                    <div className={clsx(styles["progress-bar"])}>
                                        <div className={clsx(styles["progress"])} style={{ width: '75%' }}></div>
                                    </div>
                                </div>
                                <div className={clsx(styles["dashboard-card"])}>
                                    <h3>Teruggaven</h3>
                                    <p>€ 1.234</p>
                                    <div className={clsx(styles["progress-bar"])}>
                                        <div className={clsx(styles["progress"])} style={{ width: '50%' }}></div>
                                    </div>
                                    <small>50% verwerkt</small>
                                </div>
                                <div className={clsx(styles["dashboard-card"])}>
                                    <h3>Alerts</h3>
                                    <ul>
                                        <li>Herinnering: BTW-aangifte Q3</li>
                                        <li>Nieuwe berichten van de fiscus</li>
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={clsx(styles["dashboard-card"])}>
                                    <h3>Totale Belastingen</h3>
                                    <p>€ --</p>
                                    <div className={clsx(styles["progress-bar"])}>
                                        <div className={clsx(styles["progress"])} style={{ width: '0%' }}></div>
                                    </div>
                                    <small>--% betaald</small>
                                </div>
                                <div className={clsx(styles["dashboard-card"])}>
                                    <h3>Aangifte Status</h3>
                                    <p>-- van -- ingediend</p>
                                    <div className={clsx(styles["progress-bar"])}>
                                        <div className={clsx(styles["progress"])} style={{ width: '0%' }}></div>
                                    </div>
                                </div>
                                <div className={clsx(styles["dashboard-card"])}>
                                    <h3>Teruggaven</h3>
                                    <p>€--</p>
                                    <div className={clsx(styles["progress-bar"])}>
                                        <div className={clsx(styles["progress"])} style={{ width: '0%' }}></div>
                                    </div>
                                    <small>--% verwerkt</small>
                                </div>
                                <div className={clsx(styles["dashboard-card"])}>
                                    <h3>Alerts</h3>
                                    <ul>
                                        --
                                    </ul>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
}