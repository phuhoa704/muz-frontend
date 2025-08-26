import { ColumnDef } from '@tanstack/react-table'
import { Release } from '../types'

export const TABLE_COLUMNS: ColumnDef<Release>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'artist.name',
    header: 'Artist',
  },
  {
    accessorKey: 'releaseType.name',
    header: 'Release type',
  },
]
