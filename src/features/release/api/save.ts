import API from "../../../lib/api";
import { ApiResponse } from "../../../types";
import { Release } from "../types";

export const createRelease = (data: FormData): Promise<ApiResponse<Release>> => {
    return API.upload('/release', data);
}

export const updateRelease = (id: string, data: FormData): Promise<ApiResponse<Release>> => {
    return API.upload(`/release/${id}`, data)
}