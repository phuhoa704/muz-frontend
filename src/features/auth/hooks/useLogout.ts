import { useAuth } from "../../../hooks/auth";
import { AuthStorage } from "../utils";

export function useLogout() {
    const auth = useAuth();

    return () => {
        AuthStorage.clearAuthData();

        auth.logout();
    }
}