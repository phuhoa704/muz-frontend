import { QueryRequest } from "../../../types";
import { Release } from "./Release";

export interface ReleaseQueryRequest extends QueryRequest, Partial<Release> {
    isActive?: boolean;
}