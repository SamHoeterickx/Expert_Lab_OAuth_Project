export const AuthProviderButton = () => {

    const handleClick = (e) => {
        e.preventDefault();

        const client_id = import.meta.env.VITE_CLIENT_ID;
        const redirect_uri = encodeURIComponent(import.meta.env.VITE_REDIRECT_URI);
        console.log(redirect_uri)

        fetch(`http://localhost:8080/api/oauth/auth?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}`, {
            headers: {
                'Content-type': "application/json"
            },
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            window.location.href = data.redirectUrl;
        })
    }

    return (
        <button
            onClick={handleClick}
        >
            Login met provider
        </button>
    )
}