'use client';
// import { AlertModal } from '@/components/modal/alert-modal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
// import { Employee } from '@/constants/data';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

// interface CellActionProps {
//   data: Employee;
// }

export const CellAction= () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {};

  return (
    <>
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      /> */}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button className="h-8 w-8 p-0">
            <span className="sr-only hover:bg-slate-100">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=' flex justify-start items-start flex-col gap-2'>
          <DropdownMenuLabel className='flex text-slate-900 text-sm font-semibold self-start'>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => router.push(`/dashboard`)}
            className='w-full h-6 rounded-sm text-slate-700 text-sm font-medium flex flex-row hover:bg-slate-100 cursor-pointer items-center'
            
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)} className='w-full h-6 rounded-sm text-slate-700 text-sm font-medium flex flex-row hover:bg-slate-100 cursor-pointer items-center'>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
