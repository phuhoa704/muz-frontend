import { Role } from "../features/access-control/types";
import { IsPremium } from "./IsPremium";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles: Role[];
    is_premium: IsPremium;
    created_at: Date | string;
    updated_at: Date | string;
}