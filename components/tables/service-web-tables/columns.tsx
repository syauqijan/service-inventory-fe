import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { MoveDown, MoveUp, Copy } from 'lucide-react';
import { Service } from '@/app/(dashboard)/dashboard/service/page';
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
            const allIds = table.getRowModel().rows.map(row => row.original.id);
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
            setSelectedIds(prev => [...prev, row.original.id]);
          } else {
            setSelectedIds(prev => prev.filter(id => id !== row.original.id));
          }
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <div className="flex items-center justify-between">
        Service Name
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="ml-2 flex flex-row gap-0"
        >
          <MoveUp className="w-4" />
          <MoveDown className="w-4" />
        </button>
      </div>
    ),
  },
  {
    accessorKey: 'gitlabUrl',
    header: 'gitlabURL',
    cell: ({ row }) => (
      <div className='flex justify-between w-[500px]'>
        <a href={row.original.gitlabUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          {row.original.gitlabUrl}
        </a>
        <button onClick={() => copyToClipboard(row.original.gitlabUrl)}>
          <Copy className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    ),
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => (
      <Link href={`/dashboard/service/service-web/view-service?id=${row.original.id}`} passHref>
        <button className='text-gray-500'>
          View Detail
        </button>
      </Link>
      
    ),
  },
];
