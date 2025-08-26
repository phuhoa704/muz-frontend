import { FC, PropsWithChildren, createContext, useEffect, useMemo, useState } from "react";
import { PAGINATION_DEFAULT_SIZE, PAGINATION_FIRST_PAGE } from "../../../config";
import { ArtistQueryRequest } from "../types/ArtistQueryRequest";
import { Artist } from "../types";
import { useArtistsQuery } from "../hooks/useArtistQuery";
import { toast } from "../../../components/ui/toast/use-toast";
import { TableState } from "@tanstack/react-table";
import { PaginationResponse } from "../../../types";

export interface ArtistManagementContextType {
  filters: ArtistQueryRequest;
  setFilters: (filters: Partial<ArtistQueryRequest>) => void;
  tableState?: Partial<TableState> | undefined;
  refreshData: () => void;
  loading?: boolean;
  meta?: PaginationResponse
}

const ArtistManagementContext = createContext<ArtistManagementContextType>({} as ArtistManagementContextType)

const ArtistManagementProvider: FC<PropsWithChildren> = ({ children }) => {
  const artistManagementProps = useArtistManagementData();

  return (
    <ArtistManagementContext.Provider value={{ ...artistManagementProps}}>
      {children}
    </ArtistManagementContext.Provider>
  )
}

const defautFilters: ArtistQueryRequest = {
  pageIndex: PAGINATION_FIRST_PAGE,
  pageSize: PAGINATION_DEFAULT_SIZE,
  sortBy: 'updated_at',
  sortDir: 'desc',
  _q: '',
  isActive: true
}


const useArtistManagementData = () => {
  const [filters, setFilters] = useState<ArtistQueryRequest>(null!);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Artist[]>([]);
  const [meta, setMeta] = useState<PaginationResponse>();
  const query = useArtistsQuery(filters);

  const handleChangeFilters = (filters: Partial<ArtistQueryRequest>) => {
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
      setMeta(data?.meta);
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

  return { filters, setFilters: handleChangeFilters, data: isLoading ? [] : data, tableState, handleChangeFilters, loading, refreshData, setIsLoading, meta }
}

export { ArtistManagementProvider, ArtistManagementContext }