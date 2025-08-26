import { useMemo } from 'react'
import { TABLE_COLUMNS } from '../config'
import { useSongManagementState, useSongQuery } from '../hooks'
import { useModal } from '../../../hooks/useModal'
import { Row, SortingState } from '@tanstack/react-table'
import { Song } from '../types'
import { PaginationTable } from '../../../components/PaginationTable'
import { DEFAULT_PAGINATION } from '../../../config'
import DialogSongForm from './DialogSongForm'

const useSongColumn = () => {
  return useMemo(() => {
    const columns = TABLE_COLUMNS
    columns.forEach((col) => {
      col.header = col.header as string
    })

    return columns
  }, [])
}

const SongList = () => {
  const { filters, tableState, setFilters, loading, refreshData } =
    useSongManagementState()
  const columns = useSongColumn()
  const query = useSongQuery(filters)
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

  const handleCloseArtistModal = (rep?: Song) => {
    if (rep) {
      refreshData()
    }
    closeModal()
  }

  const onRowClick = (row: Row<Song>) => {
    const { id } = row.original
    if (id) {
      openModal(
        <DialogSongForm onClose={handleCloseArtistModal} data={row.original} />
      )
    }
  }

  const { data, isLoading } = query

  return (
    <div>
      <PaginationTable<Song>
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

export default SongList
