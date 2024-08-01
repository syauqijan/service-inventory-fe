import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

export interface URL {
    name: string;
    url: string;
    status: string;
}

export const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
};

export const columns: ColumnDef<URL, any>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'url',
        header: 'URL',
        cell: ({ row }) => (
            <div className="flex items-center gap-20">
                <a href={row.original.url} target="_blank" className="text-blue-600 hover:underline">
                    {row.original.url}
                </a>
                <button onClick={() => copyToClipboard(row.original.url)} className="ml-2">
                    <Copy className="w-4 h-4 text-gray-400" />
                </button>
            </div>
        ),
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
            <span className={`px-2 py-1 self-center rounded-full inline-flex border ${row.original.status === 'active' ? 'bg-green/200 border-green/600 text-green/600' : 'bg-red/200 border-red/600 text-red/600'}`}>
                {row.original.status}
            </span>
        ),
    },
];
