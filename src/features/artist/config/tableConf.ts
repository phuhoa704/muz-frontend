import { ColumnDef } from '@tanstack/react-table';
import { Artist } from '../types';

export const TABLE_COLUMNS: ColumnDef<Artist>[] = [
    {
        accessorKey: 'name',
        header: 'Name'
    },
    {
        accessorKey: 'description',
        header: 'Description',
    },
    {
        accessorKey: 'listener',
        header: 'Listener'
    }
]