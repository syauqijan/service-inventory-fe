import { ColumnDef } from '@tanstack/react-table';
import { MoveDown, MoveUp, Copy } from 'lucide-react';
import { CellAction } from './cell-actions';
import { Service } from '@/app/(dashboard)/dashboard/service/page';
import { Checkbox } from '@/components/ui/checkbox';

export const getColumns = (
  handleDeleteService: (service: Service) => void,
  handleUpdateService: (service: Service) => void
): ColumnDef<Service, any>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
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
    accessorKey: 'gitlabURL',
    header: 'gitlabURL',
    cell: ({ row }) => (
      <div className='flex justify-between w-[500px]'>
        <a href={row.original.gitlabURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          {row.original.gitlabURL}
        </a>
        <button>
          <Copy className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    ),
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => (
      // <CellAction
      //   onDelete={() => handleDeleteService(row.original)}
      //   onUpdate={() => handleUpdateService(row.original)}
      // />
      <button className='text-gray-500'>
        View Detail
      </button>
    ),
  },
];