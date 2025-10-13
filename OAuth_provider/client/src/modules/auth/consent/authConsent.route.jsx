import { ProtectedRoute } from "../../../shared/auth/ProtectedRoute";
import { AuthConsent } from "./page/AuthConsent.page";

export const AUTH_CONSENT_ROUTE = {
    path: '/auth/consent',
    element: (
        <ProtectedRoute redirect_path={"/auth/login"}>
            <AuthConsent />
        </ProtectedRoute>
    )
}