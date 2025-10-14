import { createHashRouter, RouterProvider } from "react-router-dom";

//Components
import { App } from "../app/App";

//Routes
import { HOME_ROUTE } from "../home/home.route";
import { LOG_IN_ROUTE } from "../login/login.route";
import { REGISTER_ROUTE } from "../register/register.route";
import { TOKEN_ROUTE } from "../auth/token/token.route";

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
                    path: TOKEN_ROUTE.path,
                    element: TOKEN_ROUTE.element
                }
            ]
        }
    ]);

    return <RouterProvider router={ ROUTE } />
}