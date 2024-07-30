import { ColumnDef } from '@tanstack/react-table';
import { MoveDown, MoveUp } from 'lucide-react';
import { CellAction } from './cell-actions';
import { Service } from '@/app/(dashboard)/dashboard/service/page';

export const getColumns = (
  handleDeleteService: (service: Service) => void,
  handleUpdateService: (service: Service) => void
): ColumnDef<Service, any>[] => [
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
      <a href={row.original.gitlabURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
        {row.original.gitlabURL}
      </a>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <CellAction
        onDelete={() => handleDeleteService(row.original)}
        onUpdate={() => handleUpdateService(row.original)}
      />
    ),
  },
];