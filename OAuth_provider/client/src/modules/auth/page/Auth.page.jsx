import { useEffect } from "react";
import { useSearchParams } from "react-router-dom"

export const Auth = () => {
    
    const [searchParams, setSearchParams] = useSearchParams();


    useEffect(() => {
        console.log(searchParams);
        console.log(`Code: ${searchParams.get('code')}`);
        console.log(`State: ${searchParams.get('state')}`);
    }, [searchParams])

    return (
        <h1>auth</h1>
    )
}