import { createHashRouter, RouterProvider } from "react-router-dom";

//Components
import { App } from "../app/App";

//Routes
import { HOME_ROUTE } from "../home/home.route";
import { LOG_IN_ROUTE } from "../login/login.route";
import { AUTH_LOGIN_ROUTE } from "../auth/login/authLogin.route";
import { REGISTER_ROUTE } from "../register/register.route";
import { AUTH_CONSENT_ROUTE } from "../auth/consent/authConsent.route";

export const Root = () => {
    const ROUTE = createHashRouter([
        {
            path: '/',
            element: <App />,
            children: [
                {
                    path: HOME_ROUTE.path,
                    element: HOME_ROUTE.element
                },
                {
                    path: LOG_IN_ROUTE.path,
                    element: LOG_IN_ROUTE.element
                },
                {
                    path: REGISTER_ROUTE.path,
                    element: REGISTER_ROUTE.element
                },
                {
                    path: AUTH_LOGIN_ROUTE.path,
                    element: AUTH_LOGIN_ROUTE.element
                },
                {
                    path: AUTH_CONSENT_ROUTE.path,
                    element: AUTH_CONSENT_ROUTE.element
                }
            ]
        }
    ]);

    return <RouterProvider router={ ROUTE } />
}