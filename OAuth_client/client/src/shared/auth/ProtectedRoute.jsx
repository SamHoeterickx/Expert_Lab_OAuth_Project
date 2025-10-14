import { useEffect } from "react";
import { useState } from "react"
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, redirect_path }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3001/api/check-session", {
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            setIsLoggedIn(data.loggedIn);
            setIsLoading(false);
        })
        .catch(() => setIsLoggedIn(false))
        .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) return <p>Loading...</p>;

    if (!isLoggedIn) return <Navigate to={redirect_path} />;


    return children
}