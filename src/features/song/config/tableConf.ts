import { ColumnDef } from "@tanstack/react-table";
import { Song } from "../types";

export const TABLE_COLUMNS: ColumnDef<Song>[] = [
    {
        accessorKey: 'name',
        header: 'Name'
    },
    {
        accessorKey: 'artists',
        header: 'Artist',
        cell: ({ row }) => row.original.artists.map(a => a.name).join(', ')
    },
    {
        accessorKey: 'minutes',
        header: 'Minutes'
    },
    {
        accessorKey: 'seconds',
        header: 'Seconds'
    },
    {
        accessorKey: 'views',
        header: 'Views'
    }
]