import { useQuery } from "react-query";
import { ReleaseQueryRequest } from "../types/ReleaseQuery";
import { queryRelease } from "../api";

export function useReleaseQuery(query: ReleaseQueryRequest = {}) {
    return useQuery(
        ['release', JSON.stringify(query)],
        () => queryRelease(query)
    )
}