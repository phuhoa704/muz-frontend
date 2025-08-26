import API from "../../../lib/api";
import { ApiResponse } from "../../../types";
import { Artist } from "../types";
import { ArtistQueryRequest } from "../types/ArtistQueryRequest";

export const fetchAllArtists = (params?: ArtistQueryRequest): Promise<ApiResponse<Artist[]>> => {
    return API.get('/artist', params)
}

export const fetchArtist = (id: string): Promise<ApiResponse<Artist>> => {
    return API.get(`/artist/${id}`)
}

export const createArtist = (data: FormData): Promise<ApiResponse<Artist>> => {
    return API.upload('/artist', data)
}

export const updateArtist = (id: string, data: FormData): Promise<ApiResponse<Artist>> => {
    return API.upload(`/artist/${id}`, data)
}

