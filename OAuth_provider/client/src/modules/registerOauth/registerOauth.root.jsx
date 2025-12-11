import { ProtectedRoute } from "../../shared/auth/ProtectedRoute";
import { RegisterOauth } from "./page/RegisterOauth.page";

export const REGISTER_OAUTH_ROUTE = {
    path: '/register/oauth',
    element: (
        <ProtectedRoute
            redirect_path={"/login"}
        >
            <RegisterOauth />
        </ProtectedRoute>
    )
}