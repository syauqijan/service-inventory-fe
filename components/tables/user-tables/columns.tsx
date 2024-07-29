// components/tables/user-tables/columns.tsx
import { ColumnDef } from '@tanstack/react-table';
import { MoveDown, MoveUp } from 'lucide-react';
import { CellAction } from './cell-actions';
import { User } from '@/app/(dashboard)/dashboard/user-management/page';

export const getColumns = (
  handleDeleteUser: (user: User) => void,
  handleUpdateUser: (user: User) => void
): ColumnDef<User, any>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <div className="flex items-center justify-between">
        Name
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
    accessorKey: 'email',
    header: ({ column }) => (
      <div className="flex items-center justify-between">
        Email
      </div>
    ),
  },
  {
    accessorKey: 'role.name',
    header: ({ column }) => (
      <div className="flex items-center justify-between">
        Role
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
    accessorKey: 'actions',
    header: 'Actions',
    cell: (props) => (
      <CellAction
        onDelete={() => handleDeleteUser(props.row.original)}
        onUpdate={() => handleUpdateUser(props.row.original)}
      />
    ),
  },
];
