import { useEffect } from "react";
import { useState } from "react"
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        fetch("url", {
            credentials: "include"
        })
         .then(res => res.json())
        .then(data => {
            setIsLoggedIn(data.loggedIn);
        })
        .catch(() => setIsLoggedIn(false))
        .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) return <p>Loading...</p>;

    if (!isLoggedIn) return <Navigate to="/login" />;


    return children
}