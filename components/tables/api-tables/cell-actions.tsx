'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface CellActionProps {
  onDelete: () => void;
  onUpdate: () => void;
}

export const CellAction: React.FC<CellActionProps> = ({ onDelete, onUpdate }) => {
  const router = useRouter();

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button className="h-8 w-8 p-0">
            <span className="sr-only hover:bg-slate-100">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='flex justify-start items-start flex-col gap-2'>
          <DropdownMenuLabel className='flex text-slate-900 text-sm font-semibold self-start'>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={onUpdate}
            className='w-full h-6 rounded-sm text-slate-700 text-sm font-medium flex flex-row hover:bg-slate-100 cursor-pointer items-center'
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onDelete} className='w-full h-6 rounded-sm text-slate-700 text-sm font-medium flex flex-row hover:bg-slate-100 cursor-pointer items-center'>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
