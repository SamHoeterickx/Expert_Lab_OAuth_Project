import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {

    const [userData, setUserData] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:8080/api/users/get-my-data', {
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            setIsLoading(false);
            setUserData(data.data);
        });
    }, []) 

    return (
        <>
            {
                userData && !isLoading ? (
                    <h1>Welkom {userData && userData.name}</h1>
                ) : (<h1>Loading...</h1>)
            }
            {
                userData === undefined ? (
                    <Link to={"/login"}>Login</Link>
                ):(
                    <Link>Logout</Link>
                )
            }
        </>
    )
}