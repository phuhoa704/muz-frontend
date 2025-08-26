import { SortDirection } from '@tanstack/react-table'

export interface ApiResponse<TData> {
    errorCode: number;
    message: string;
    data: TData,
    meta?: PaginationResponse;
}

export interface FailureResponse {
    message: string;
    statusCode: number;
    error: string;
}

export interface PaginationResponse {
    total: number;
    currentPage: number;
    totalPage: number;
    size: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export interface QueryPaginationParameters {
    pageIndex?: number;
    pageSize?: number;
}

export interface QuerySortingParameters {
    sortBy?: string;
    sortDir?: SortDirection;
}

export type QueryRequest = QueryPaginationParameters & QuerySortingParameters & { _q?: string }