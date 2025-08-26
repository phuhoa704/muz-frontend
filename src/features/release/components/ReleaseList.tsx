import { useMemo } from "react"
import { TABLE_COLUMNS } from "../config"
import { Row, SortingState } from "@tanstack/react-table"
import { Release } from "../types"
import { PaginationTable } from "../../../components/PaginationTable"
import { useModal } from "../../../hooks/useModal"
import { useReleaseManagementState } from "../hooks/useReleaseManagementContext"
import { useReleaseQuery } from "../hooks"
import { DEFAULT_PAGINATION } from "../../../config"

const useReleaseColumn = () => {
  return useMemo(() => {
    const columns = TABLE_COLUMNS;
    columns.forEach((col) => {
      col.header = col.header as string;
    })
    return columns;
  }, [])
}

const ReleaseList = () => {
  const { filters, tableState, setFilters, loading, refreshData } = useReleaseManagementState();
  const columns = useReleaseColumn();
  const query = useReleaseQuery(filters);
  const { openModal, closeModal } = useModal();

  const onPageChange = (page: number) => {
    setFilters({pageIndex: page, pageSize: filters.pageSize})
  }

  const onPageSizeChange = (pageSize: number) => {
    setFilters({pageSize})
  }

  const onSortingChange = (sorting: SortingState) => {
    const [sort] = sorting;
    setFilters({sortBy: sort.id, sortDir: sort.desc ? 'desc' : 'asc'})
  }

  const handleCloseReleaseModal = (rep?: Release) => {
    if(rep) {
      refreshData();
    }
    closeModal();
  }

  const onRowClick = (row: Row<Release>) => {
    const { id } = row.original;
    if(id) {
      console.log('dwq');
    }
  }

  const { data, isLoading } = query;
  return (
    <div>
      <PaginationTable<Release>
        columns={columns}
        data={data?.data || []}
        isLoading={isLoading || !!loading}
        pagination={data?.meta ? data.meta : DEFAULT_PAGINATION}
        tableState={tableState}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortingChange={onSortingChange}
        onRowClick={onRowClick}
      />
    </div>
  )
}

export default ReleaseList