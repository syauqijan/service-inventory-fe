'use client';
import React from 'react';
import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel, // Import getSortedRowModel
  useReactTable,
} from '@tanstack/react-table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { ChevronLeftIcon, ChevronRightIcon, MoveDown, MoveUp } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  pageNo: number;
  totalItems: number;
  pageSizeOptions?: number[];
  pageCount: number;
}

export function ApiServiceTable<TData, TValue>({
  columns,
  data,
  searchKey,
  pageNo,
  totalItems,
  pageSizeOptions = [10, 20, 30, 40, 50],
  pageCount,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams?.get('page') ?? pageNo);
  const limit = Number(searchParams?.get('limit') ?? pageSizeOptions[0]);

  const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
    pageIndex: page - 1,
    pageSize: limit,
  });

  React.useEffect(() => {
    router.push(
      `${pathname}?page=${pageIndex + 1}&limit=${pageSize}`,
      {
        scroll: false,
      }
    );
  }, [pageIndex, pageSize, router, pathname]);

  React.useEffect(() => {
    setPagination({
      pageIndex: page - 1,
      pageSize: limit,
    });
  }, [page, limit]);

  const table = useReactTable({
    data,
    columns,
    pageCount,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(), // Use getSortedRowModel
    manualPagination: true,
    manualSorting: false, // Set to false for client-side sorting
    state: {
      pagination: { pageIndex, pageSize },
    },
    onPaginationChange: setPagination,
  });

  return (
    <>
      <ScrollArea className="h-[calc(80vh-220px)] rounded-md border">
        <Table className="relative">
          <TableHeader className="text-slate-600 text-sm font-medium leading-normal sticky top-0 bg-white">
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
            {table.getRowModel().rows?.length ? (
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
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  There is no data to display
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="flex flex-col items-center justify-end gap-2 space-x-2 py-4 sm:flex-row">
        <div className="flex w-full items-center justify-between">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
            <div className="flex items-center space-x-2">
              <p className="whitespace-nowrap text-sm font-medium">Rows per page</p>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {pageSizeOptions.map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-between gap-2 sm:justify-end">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>

          <div className="flex items-center space-x-2">
            <button
              aria-label="Go to first page"
              className="hidden h-8 w-8 p-0 lg:flex outline outline-1 outline-slate-200 rounded-md items-center justify-center cursor-pointer"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <DoubleArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              aria-label="Go to previous page"
              className="flex h-8 w-8 p-0 outline outline-1 outline-slate-200 rounded-md items-center justify-center cursor-pointer"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              aria-label="Go to next page"
              className="flex h-8 w-8 p-0 outline outline-1 outline-slate-200 rounded-md items-center justify-center cursor-pointer"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              aria-label="Go to last page"
              className="hidden h-8 w-8 p-0 lg:flex outline outline-1 outline-slate-200 rounded-md items-center justify-center cursor-pointer"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <DoubleArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export function WebServiceTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
  return <ApiServiceTable {...props} />;
}
