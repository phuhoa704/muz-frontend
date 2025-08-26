import { useMemo } from 'react'
import { useArtistManagementState, useArtistsQuery } from '../hooks'
import { TABLE_COLUMNS } from '../config/tableConf'
// import { useNavigate } from "react-router-dom";
import { Row, SortingState } from '@tanstack/react-table'
import { Artist } from '../types'
import { PaginationTable } from '../../../components/PaginationTable'
import { useModal } from '../../../hooks/useModal'
import DialogArtistForm from './DialogArtistForm'

const useArtistColumn = () => {
  return useMemo(() => {
    const columns = TABLE_COLUMNS
    columns?.forEach((col) => {
      col.header = col.header as string
    })
    return columns
  }, [])
}

const ArtistList = () => {
  const { filters, tableState, setFilters, loading, refreshData } =
    useArtistManagementState()
  const columns = useArtistColumn()
  const query = useArtistsQuery(filters)
  // const navigate = useNavigate();
  const { openModal, closeModal } = useModal()

  const onPageChange = (page: number) => {
    setFilters({ pageIndex: page, pageSize: filters.pageSize })
  }

  const onPageSizeChange = (pageSize: number) => {
    setFilters({ pageSize })
  }

  const onSortingChange = (sorting: SortingState) => {
    const [sort] = sorting
    setFilters({ sortBy: sort.id, sortDir: sort.desc ? 'desc' : 'asc' })
  }

  const handleCloseArtistModal = (rep?: Artist) => {
    if (rep) {
      refreshData()
    }
    closeModal()
  }

  const onRowClick = (row: Row<Artist>) => {
    const { id } = row.original

    if (id) {
      openModal(
        <DialogArtistForm
          onClose={handleCloseArtistModal}
          data={row.original}
        />
      )
    }
  }

  const { data, isLoading } = query

  return (
    <div>
      <PaginationTable<Artist>
        columns={columns}
        data={data?.data || []}
        isLoading={isLoading || !!loading}
        pagination={
          data?.meta
            ? data.meta
            : {
                currentPage: 1,
                hasNextPage: false,
                hasPrevPage: false,
                size: 50,
                total: 50,
                totalPage: 1,
              }
        }
        tableState={tableState}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortingChange={onSortingChange}
        onRowClick={onRowClick}
      />
    </div>
  )
}

export default ArtistList
