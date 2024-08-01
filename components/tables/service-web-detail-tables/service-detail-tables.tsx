'use client';
import {
ColumnDef,
PaginationState,
flexRender,
getCoreRowModel,
getFilteredRowModel,
getPaginationRowModel,
useReactTable
} from '@tanstack/react-table';
import React from 'react';
import { Input } from '@/components/ui/input';

import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue
} from '@/components/ui/select';
import {
Table,
TableBody,
TableCell,
TableHead,
TableHeader,
TableRow
} from '@/components/ui/table';
import {
DoubleArrowLeftIcon,
DoubleArrowRightIcon
} from '@radix-ui/react-icons';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface DataTableProps<TData, TValue> {
columns: ColumnDef<TData, TValue>[];
data: TData[];
pageSizeOptions?: number[];
}

export function ServiceDetailTable<TData, TValue>({
columns,
data,
}: DataTableProps<TData, TValue>) {
const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualFiltering: true
});

return (
    <>
    <ScrollArea className="h-[calc(155px)] w-full rounded-md border"> 
        <Table className="relative">
        <TableHeader className='text-slate-600 text-sm font-medium leading-normal sticky top-0 bg-white'>
            {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                return (
                    <TableHead key={header.id}>
                    {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                        )}
                    </TableHead>
                );
                })}
            </TableRow>
            ))}
        </TableHeader>
        <TableBody>
            {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
                <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                >
                {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                        <span   className={`${cell.getValue() === 'Active'? 'text-green-500 text-center' : cell.getValue() === 'Inactive'? 'text-red-500 text-center' : 'text-black'}`}>
                            {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                            )}
                        </span>
                    </TableCell>
                ))}
                </TableRow>
            ))
            ) : (
            <TableRow>
                <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
                >
                No results.
                </TableCell>
            </TableRow>
            )}
        </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
    </ScrollArea>
    </>
);
}