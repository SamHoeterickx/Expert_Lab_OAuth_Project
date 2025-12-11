import { Link } from 'react-router-dom';
import { REGISTER_OAUTH_ROUTE } from '../../registerOauth/registerOauth.root';

//Style
import './home.modules.scss'

export const Home = () => {
    return (
        <section className='home-wrapper'>
           <div>
                <Link
                    to={ REGISTER_OAUTH_ROUTE.path }
                    className='button'
                >
                    Register OAuth
                </Link>
           </div>
        </section>
    )
}