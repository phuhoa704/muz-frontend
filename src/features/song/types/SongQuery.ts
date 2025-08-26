import { QueryRequest } from "../../../types";
import { Song } from "./Song";

export interface SongQueryRequest extends QueryRequest, Partial<Song> {
    isActive?: boolean;
}