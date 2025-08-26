import { ApiResponse } from "../../../types";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthData {
    accessToken: string;
    profile: {
        id: number;
        username: string;
        email: string;
        password: string;
        is_premium: boolean;
        created_at: Date | string;
        updated_at: Date | string;
    }
}

export type LoginResponse = ApiResponse<AuthData>;