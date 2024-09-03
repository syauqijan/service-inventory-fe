'use client';

import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel, // Pastikan ini diimpor
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  pageNo: number;
  totalUsers: number;
  pageSizeOptions?: number[];
  pageCount: number;
  limit: number;  // Tambahkan prop limit di sini
}

export function UserTable<TData, TValue>({
  columns,
  data,
  pageNo,
  searchKey,
  totalUsers,
  pageCount,
  pageSizeOptions = [10, 20, 30, 40, 50],
  limit,  // Terima prop limit
}: DataTableProps<TData, TValue>) {
  const router = useRouter();

  const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
    pageIndex: pageNo - 1,
    pageSize: limit,  // Gunakan limit sebagai pageSize awal
  });

  const table = useReactTable({
    data,
    columns,
    pageCount,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(), // Tambahkan ini untuk mengaktifkan sorting
    manualPagination: true,
    onPaginationChange: setPagination,
    state: {
      pagination: { pageIndex, pageSize },
    },
  });

  React.useEffect(() => {
    router.push(`?page=${pageIndex + 1}&limit=${pageSize}`, { scroll: false });
  }, [pageIndex, pageSize, router]);

  return (
    <>
      <div className="overflow-x-auto">
        <Table className="min-w-full bg-white">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-4">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center">
          <span className="mr-2 w-60">Rows per page:</span>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              const newPageSize = Number(value);
              setPagination((prev) => ({
                ...prev,
                pageSize: newPageSize,
                pageIndex: 0, // Reset to first page when page size changes
              }));
              router.push(`?page=1&limit=${newPageSize}`, { scroll: false });
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="p-2"
          >
            <DoubleArrowLeftIcon />
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="p-2"
          >
            <ChevronLeftIcon />
          </button>
          <span>
            Page {pageIndex + 1} of {table.getPageCount()}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="p-2"
          >
            <ChevronRightIcon />
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="p-2"
          >
            <DoubleArrowRightIcon />
          </button>
        </div>
      </div>
    </>
  );
}
