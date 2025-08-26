import API from "../../../lib/api";
import { LoginRequest, LoginResponse } from "../types";

export const loginWithEmailAndPassword = (data: LoginRequest): Promise<LoginResponse> => {
    return API.post('/auth/login', data);
}