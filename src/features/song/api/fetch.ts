import API from "../../../lib/api";
import { ApiResponse } from "../../../types";
import { Song } from "../types";
import { SongQueryRequest } from "../types/SongQuery";

export const querySong = (params?: SongQueryRequest): Promise<ApiResponse<Song[]>> => {
    return API.get('/song', params)
}