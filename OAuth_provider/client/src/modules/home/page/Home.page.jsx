import { Link } from 'react-router-dom';
import { REGISTER_OAUTH_ROUTE } from '../../registerOauth/registerOauth.root';
export const Home = () => {
    return (
        <>
            <h1>Home</h1>
            <Link to={ REGISTER_OAUTH_ROUTE.path }>Register OAuth</Link>
        </>
    )
}