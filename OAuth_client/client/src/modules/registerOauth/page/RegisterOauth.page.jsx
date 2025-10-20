import { useRef } from "react"

export const RegisterOauth = () => {

    const formRef = useRef();

    return(
        <>
            <h2>Register OAuth</h2>
            <form
                ref={formRef}
            ></form>
        </>
    )
}