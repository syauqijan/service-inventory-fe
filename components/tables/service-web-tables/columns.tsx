import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { MoveDown, MoveUp, Edit, Trash, Copy } from 'lucide-react';
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
    roleId: number | null
): ColumnDef<Service, any>[] => {
    const columns: ColumnDef<Service, any>[] = [
        {
            accessorKey: 'name',
            header: ({ column }) => (
                <div className="flex items-center justify-between">
                    Service Name
                    <button
                        onClick={() => column.toggleSorting()}
                        className="ml-2 flex flex-row gap-0"
                    >
                        <MoveUp className={`w-4 ${column.getIsSorted() === 'asc' ? 'text-black' : 'text-gray-400'}`} />
                        <MoveDown className={`w-4 ${column.getIsSorted() === 'desc' ? 'text-black' : 'text-gray-400'}`} />
                    </button>
                </div>
            ),
            enableSorting: true,
            cell: ({ row }) => (
                <Link href={`/dashboard/service/service-web/view-service?id=${row.original.id}`} passHref>
                    {row.original.name}
                </Link>
            ),
        },
        {
            accessorKey: 'gitlabUrl',
            header: 'Gitlab URL',
            enableSorting: false,
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
    ];

    // Tambahkan kolom Actions jika roleId bukan 3
    if (roleId !== 3) {
        columns.push({
            id: 'actions',
            header: 'Actions',
            enableSorting: false,
            cell: ({ row }) => (
                <div className='flex flex-row gap-4'>
                    <Edit
                        className="cursor-pointer mr-2 h-4 w-4"
                        onClick={() => handleUpdateService(row.original)}
                    />
                    <Trash
                        className="cursor-pointer mr-2 h-4 w-4"
                        onClick={() => handleDeleteService(row.original)} 
                    />
                </div>
            ),
        });
    }

    return columns;
};
