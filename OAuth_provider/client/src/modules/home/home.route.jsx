import { Home } from "./page/Home.page";

//Auth
import { ProtectedRoute } from "../../shared/auth/ProtectedRoute";

export const HOME_ROUTE = {
    path: '',
    element: (
        <ProtectedRoute redirect_path={"/login"}>
            <Home />
        </ProtectedRoute>
    )
}