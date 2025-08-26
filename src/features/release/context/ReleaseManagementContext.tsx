import { createContext, PropsWithChildren, FC, useState, useEffect, useMemo } from "react";
import { ReleaseQueryRequest } from "../types/ReleaseQuery";
import { TableState } from "@tanstack/react-table";
import { PaginationResponse } from "../../../types";
import { Release } from "../types";
import { PAGINATION_DEFAULT_SIZE, PAGINATION_FIRST_PAGE } from "../../../config";
import { toast } from "../../../components/ui/toast/use-toast";
import { useReleaseQuery } from "../hooks";

export interface ReleaseManagementContextType {
    filters: ReleaseQueryRequest;
    setFilters: (filters: Partial<ReleaseQueryRequest>) => void;
    tableState?: Partial<TableState> | undefined;
    refreshData: () => void;
    loading?: boolean;
    meta?: PaginationResponse
}

const ReleaseManagementContext = createContext<ReleaseManagementContextType>({} as ReleaseManagementContextType)

const ReleaseManagementProvider: FC<PropsWithChildren> = ({ children }) => {
    const releaseManagementProps = useReleaseTypeManagementData();

    return (
        <ReleaseManagementContext.Provider value={{...releaseManagementProps}}>
            {children}
        </ReleaseManagementContext.Provider>
    )
}

const defautFilters: ReleaseQueryRequest = {
    pageIndex: PAGINATION_FIRST_PAGE,
    pageSize: PAGINATION_DEFAULT_SIZE,
    sortBy: 'updated_at',
    sortDir: 'desc',
    _q: '',
    isActive: true
}

const useReleaseTypeManagementData = () => {
    const [filters, setFilters] = useState<ReleaseQueryRequest>(null!);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<Release[]>([]);
    const query = useReleaseQuery(filters);

    const handleChangeFilters = (filters: Partial<ReleaseQueryRequest>) => {
        setFilters(prev => ({
            ...prev,
            pageIndex: PAGINATION_FIRST_PAGE,
            ...filters
        }))
    }

    const loading = query.isLoading || isLoading;

    useEffect(() => {
        setFilters(defautFilters);
    }, [setFilters, filters]);

    const refreshData = async () => {
        setIsLoading(true);
        try {
            const { data } = await query.refetch();
            setData(data?.data || []);
        } catch (error) {
            toast({
                description: error instanceof Error ? error.message : 'Error.'
            })
        } finally {
            setIsLoading(false);
        }
    }

    const tableState = useMemo(() => {
        return {
            sorting: [
                {
                    id: filters?.sortBy || 'updated_at',
                    desc: filters?.sortDir === 'desc'
                }
            ]
        }
    }, [filters])

    return { filters, setFilters: handleChangeFilters, data: isLoading ? [] : data, tableState, handleChangeFilters, loading, refreshData, setIsLoading }
}

export { ReleaseManagementProvider, ReleaseManagementContext }