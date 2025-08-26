import API from "../../../lib/api";
import { ApiResponse } from "../../../types";
import { Song } from "../types";

export const createSong = (data: FormData): Promise<ApiResponse<Song>> => {
    return API.upload('/song', data);
}

export const updateSong = (id: string, data: FormData): Promise<ApiResponse<Song>> => {
    return API.upload(`/song/${id}`, data)
}