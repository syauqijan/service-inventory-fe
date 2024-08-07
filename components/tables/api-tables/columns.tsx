import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { MoveDown, MoveUp, Copy } from 'lucide-react';
import { Service } from '@/app/(dashboard)/dashboard/api/page';
import { toast } from 'sonner';
import Link from 'next/link';

// function to copy text to clipboard
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success('Copied to clipboard');
};

export const getColumns = (
  handleDeleteService: (service: Service) => void,
  handleUpdateService: (service: Service) => void,
  selectedIds: string[], // Add selectedIds as parameter
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>> // Add setSelectedIds as parameter
): ColumnDef<Service, any>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(!!value);
          if (value) {
            const allIds = table.getRowModel().rows.map(row => row.original.apiId);
            setSelectedIds(allIds);
          } else {
            setSelectedIds([]);
          }
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
          if (value) {
            setSelectedIds(prev => [...prev, row.original.apiId]);
          } else {
            setSelectedIds(prev => prev.filter(id => id !== row.original.apiId));
          }
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'service_api.name',
    header: ({ column }) => (
      <div className="flex items-center justify-between font-semibold text-black">
       Service
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="flex flex-row gap-0 text-gray-400"
        >
          <MoveUp className="w-4" />
          <MoveDown className="w-4" />
        </button>
      </div>
    ),
  },
  {
    accessorKey: 'api.method',
    header: () => (
      <div className="flex items-center justify-between font-semibold text-black">
        Method
      </div>
    ),
  },
  {
    accessorKey: 'api.endpoint',
    header: () => (
      <div className="flex items-center justify-between font-semibold text-black">
        Endpoint
      </div>
    ),
  },
  {
    accessorKey: 'api.version',
    header: () => (
      <div className="flex items-center justify-between font-semibold text-black">
        Version
      </div>
    ),
  },
  {
    accessorKey: 'api.status',
    header: () => (
      <div className="flex items-center justify-center w-3/4 font-semibold text-black">
        Status
      </div>
    ),
    cell: ({ row }) => (
        <span className={`px-2 py-1 self-center rounded-full flex items-center justify-center w-3/4 border ${row.original.api!.status === 'active' ? 'bg-green/200 border-green/600 text-green/600' : 'bg-red/200 border-red/600 text-red/600'}`}>
            {row.original.api!.status}
        </span>
    ),
  },
  {
    accessorKey: 'api.platform',
    header: () => (
      <div className="flex items-center justify-between font-semibold text-black">
        Platform
      </div>
    ),
  },
];