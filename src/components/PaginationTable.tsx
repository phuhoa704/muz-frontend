import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "./ui/pagination";
import { NoDataTable, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableRowLoading } from "./ui/table";
import { cn } from "../lib/utils";
import { PaginationResponse } from "../types";
import { Cell, ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, Row, SortingState, TableState, useReactTable } from "@tanstack/react-table";
import { ArrowDownUp, ArrowDownWideNarrow, ArrowUpNarrowWide, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import React from "react";
import { When } from 'react-if';
import { isBoolean } from "lodash";
import { Select } from "./ui/select";

const paginationSize = 7;

const defaultPagination: PaginationResponse = {
    currentPage: 1,
    size: 50,
    totalPage: 10,
    total: 0,
    hasNextPage: false,
    hasPrevPage: false,
}

const sizeOptions = [10, 20, 50, 100].map((opt) => ({
    label: opt,
    value: opt,
}));

const SortingIcons = {
    asc: <ArrowUpNarrowWide size={16} />,
    desc: <ArrowDownWideNarrow size={16} />,
};

export type ColumnDefCustom<T> = ColumnDef<T> & {
    renderHeader?: () => JSX.Element;
};

interface PaginationProps {
    pagination?: PaginationResponse;
    onPageSizeChange?: (pageSize: number) => void;
    onPageChange?: (page: number) => void;
}

interface PaginationTableProps<T> extends PaginationProps {
    columns: ColumnDefCustom<T>[];
    data: T[];
    isLoading: boolean;
    onRowClick?: (row: Row<T>) => void;
    onCellClick?: (cell: Cell<T, any>) => void;
    tableState?: Partial<TableState> | undefined;
    onSortingChange?: (sorting: SortingState) => void;
    tableClassName?: string;
    tableHeaderClassName?: string;
    tableRowClassName?: (row: Row<T>) => string;
    id?: string;
}

const PaginationTable = <T,>({ columns, data, isLoading, onRowClick, onCellClick, pagination, tableState, onSortingChange, tableClassName, tableHeaderClassName, tableRowClassName, id = 'paginationTable', ...props }: PaginationTableProps<T>) => {
    const table = useReactTable({
        columns,
        data,
        debugTable: true,
        rowCount: pagination?.total || 0,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        manualSorting: true,
        state: tableState,
    })
    return (
        <div className="flex flex-col space-y-4 w-full">
            <Table className={tableClassName} id={id}>
                <TableHeader className={tableHeaderClassName}>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className="hover:bg-transparent">
                            {headerGroup.headers.map((header) => {
                                const canSort = header.column.getCanSort();
                                const size = header.column.getSize();
                                const sortingIcon =
                                    SortingIcons[
                                    header.column.getIsSorted() as keyof typeof SortingIcons
                                    ];

                                const className = cn(
                                    'flex items-center gap-1',
                                    canSort && 'cursor-pointer select-none',
                                    { 'text-wrap': size < 150 },
                                );

                                const sortIcon = canSort ? (
                                    <ArrowDownUp
                                        size={16}
                                        className="invisible group-hover:visible"
                                    />
                                ) : null;
                                const columnDef = header.column.columnDef as ColumnDefCustom<T>;

                                return (
                                    <TableHead
                                        key={header.id}
                                        style={{ width: size !== 150 ? size : 'auto' }}
                                        className="group"
                                    >
                                        {header.isPlaceholder ? null : columnDef?.renderHeader ? (
                                            columnDef.renderHeader()
                                        ) : (
                                            <div
                                                className={className}
                                                onClick={() => {
                                                    if (canSort) {
                                                        const currentSorting = header.column.getIsSorted();
                                                        const isDesc =
                                                            (isBoolean(currentSorting) &&
                                                                currentSorting === false) ||
                                                                currentSorting === 'asc'
                                                                ? true
                                                                : false;
                                                        onSortingChange?.([
                                                            {
                                                                id: header.column.id,
                                                                desc: isDesc,
                                                            },
                                                        ]);
                                                    }
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext(),
                                                )}

                                                <span className="inline-flex">
                                                    {canSort && (sortingIcon ?? sortIcon)}
                                                </span>
                                            </div>
                                        )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    <When condition={isLoading}>
                        <TableRowLoading colSpan={columns.length} />
                    </When>

                    <When condition={!isLoading && !data?.length}>
                        <NoDataTable colSpan={columns.length} />
                    </When>

                    <When condition={!isLoading && data?.length}>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow
                                className={cn('group relative', tableRowClassName?.(row))}
                                key={row.id}
                                onClick={() => onRowClick?.(row)}
                            >
                                {row.getVisibleCells().map((cell) => {
                                    const size = cell.column.getSize();
                                    return (
                                        <TableCell
                                            key={cell.id}
                                            style={{ width: size !== 150 ? size : 'auto' }}
                                            className={cn('break-words whitespace-normal')}
                                            onClick={() => onCellClick?.(cell)}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </When>
                </TableBody>
            </Table>

            <When condition={pagination?.currentPage}>
                <PaginationControl pagination={pagination} {...props} />
            </When>
        </div>
    )
}

const PaginationControl: React.FC<PaginationProps> = ({ pagination, onPageSizeChange, onPageChange }) => {
    const { currentPage, size, total, totalPage } = pagination || defaultPagination;
    // Calculate the range of results being displayed
    const startIndex = (currentPage - 1) * size + 1;
    const endIndex = Math.min(startIndex + size - 1, total);

    // Calculate the range of pages to display
    const startPage = Math.max(1, currentPage - Math.floor(paginationSize / 2));
    const endPage = Math.min(totalPage, startPage + paginationSize - 1);

    // Generate the array of page numbers to display
    const pages = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i,
    );
    return (
        <div className="flex flex-wrap justify-between gap-3">
            <div className="flex items-center space-x-3">
                {/* <Select
                    className={cn('w-24', { hidden: !total })}
                    //   placeholder="Page Size"
                    value={{
                        label: size,
                        value: size,
                    }}
                    onChange={({ value }: any) => onPageSizeChange?.(value as number)}
                    options={sizeOptions}
                /> */}
                <p>
                    {`Pagination results from ${total === 0 ? 0 : startIndex} to ${endIndex} total ${total}`}
                </p>
            </div>
            <div className={cn({ hidden: !total })}>
                <Pagination>
                    <PaginationContent>
                        <When condition={startPage > 1}>
                            <PaginationItem>
                                <PaginationLink onClick={() => onPageChange?.(1)}>
                                    <ChevronsLeft />
                                </PaginationLink>
                            </PaginationItem>
                        </When>

                        <When condition={currentPage !== 1}>
                            <PaginationItem>
                                <PaginationLink onClick={() => onPageChange?.(currentPage - 1)}>
                                    <ChevronLeft />
                                </PaginationLink>
                            </PaginationItem>
                        </When>

                        {pages?.map((page) => (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    isActive={page === currentPage}
                                    onClick={() => onPageChange?.(page)}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <When condition={currentPage !== totalPage}>
                            <PaginationItem>
                                <PaginationLink onClick={() => onPageChange?.(currentPage + 1)}>
                                    <ChevronRight />
                                </PaginationLink>
                            </PaginationItem>
                        </When>

                        <When condition={endPage < totalPage}>
                            <PaginationItem>
                                <PaginationLink onClick={() => onPageChange?.(totalPage)}>
                                    <ChevronsRight />
                                </PaginationLink>
                            </PaginationItem>
                        </When>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}

export { PaginationTable}