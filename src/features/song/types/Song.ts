import { Artist } from "../../artist/types";

export interface Song {
    id: number;
    name: string;
    image: string;
    minutes: number;
    seconds: number;
    views: number;
    url: string;
    artists: Artist[];
    created_at: Date | string;
    updated_at: Date | string;
}