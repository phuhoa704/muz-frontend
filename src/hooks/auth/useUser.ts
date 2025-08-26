import { useAuth } from "./useAuth";

export function useUser() {
    const { user } = useAuth();

    return {
        ...user,
        displayName: `${user?.firstName} ${user?.lastName}`.trim()
    }
}

export function useUpdateUser() {
    const { update } = useAuth();

    return update;
}