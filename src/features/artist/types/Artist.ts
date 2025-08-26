import { Release } from "../../release/types";
import { Song } from "../../song/types";

export interface Artist {
    id: number;
    name: string;
    description: string;
    image: string;
    listener: number;
    releases: Release[];
    songs: Song[];
    created_at: Date | string;
    updated_at: Date | string;
}