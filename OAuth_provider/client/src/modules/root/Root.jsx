import { createHashRouter, RouterProvider } from "react-router-dom";

//Components
import { App } from "../app/App";

//Routes
import { HOME_ROUTE } from "../home/home.route";

export const Root = () => {
    const ROUTE = createHashRouter([
        {
            path: '/',
            element: <App />,
            children: [
                {
                    path: HOME_ROUTE.path,
                    element: HOME_ROUTE.element
                }
            ]
        }
    ]);

    return <RouterProvider router={ ROUTE } />
}