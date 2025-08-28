import {
  createContext,
  PropsWithChildren,
  FC,
  useState,
  useEffect,
  useMemo,
} from 'react'
import { SongQueryRequest } from '../types/SongQuery'
import { TableState } from '@tanstack/react-table'
import { PaginationResponse } from '@/types'
import { Song } from '../types'
import { PAGINATION_DEFAULT_SIZE, PAGINATION_FIRST_PAGE } from '@/config'
import { toast } from '@/components/ui/toast/use-toast'
import { useSongQuery } from '../hooks'

export interface ReleaseManagementContextType {
  filters: SongQueryRequest
  setFilters: (filters: Partial<SongQueryRequest>) => void
  tableState?: Partial<TableState> | undefined
  refreshData: () => void
  loading?: boolean
  meta?: PaginationResponse
}

const SongManagementContext = createContext<ReleaseManagementContextType>(
  {} as ReleaseManagementContextType
)

const SongManagementProvider: FC<PropsWithChildren> = ({ children }) => {
  const songManagementProps = useSongManagementData()
  return (
    <SongManagementContext.Provider value={{ ...songManagementProps }}>
      {children}
    </SongManagementContext.Provider>
  )
}

const defautFilters: SongQueryRequest = {
  pageIndex: PAGINATION_FIRST_PAGE,
  pageSize: PAGINATION_DEFAULT_SIZE,
  sortBy: 'updated_at',
  sortDir: 'desc',
  _q: '',
  isActive: true,
}

const useSongManagementData = () => {
  const [filters, setFilters] = useState<SongQueryRequest>(null!)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<Song[]>([])
  const query = useSongQuery(filters)

  const handleChangeFilters = (filters: Partial<SongQueryRequest>) => {
    setFilters((prev) => ({
      ...prev,
      pageIndex: PAGINATION_FIRST_PAGE,
      ...filters,
    }))
  }

  const loading = query.isLoading || isLoading

  useEffect(() => {
    setFilters(defautFilters)
  }, [setFilters, filters])

  const refreshData = async () => {
    setIsLoading(true)
    try {
      const { data } = await query.refetch()
      setData(data?.data || [])
    } catch (error) {
      toast({
        description: error instanceof Error ? error.message : 'Error.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const tableState = useMemo(() => {
    return {
      sorting: [
        {
          id: filters?.sortBy || 'updated_at',
          desc: filters?.sortDir === 'desc',
        },
      ],
    }
  }, [filters])

  return {
    filters,
    setFilters: handleChangeFilters,
    data: isLoading ? [] : data,
    tableState,
    handleChangeFilters,
    loading,
    refreshData,
    setIsLoading,
  }
}

export { SongManagementProvider, SongManagementContext }
