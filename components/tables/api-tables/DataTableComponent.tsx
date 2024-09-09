"use client";
import React from "react";
import dynamic from 'next/dynamic';
import { TableColumn } from 'react-data-table-component';
import { DataRow } from './types';
import { Trash } from 'lucide-react';

// Dynamic import of DataTable
const DataTable = dynamic(() => import('react-data-table-component'), {
    ssr: false,
    loading: () => <p>Loading DataTable...</p>
}) as React.ComponentType<{ columns: TableColumn<DataRow>[]; data: DataRow[]; pagination: boolean; highlightOnHover: boolean; responsive: boolean; paginationPerPage: number; paginationRowsPerPageOptions: number[]; customStyles: object; className: string; }>;

interface DataTableComponentProps {
    data: DataRow[];
    onDeleteClick: (id: string) => void;
    roleId: number | null; // Tambahkan roleId sebagai prop
}

const DataTableComponent: React.FC<DataTableComponentProps> = ({ data, onDeleteClick, roleId }) => {
    const columns: TableColumn<DataRow>[] = [
        { 
            name: 'Service Name', 
            selector: (row) => row.service_api?.name || 'N/A',
            sortable: true,
            minWidth: '300px',
            cell: row => <div className="text-gray-800">{row.service_api?.name || 'N/A'}</div>,
        },
        { 
            name: 'Method', 
            selector: (row) => row.method || 'N/A', 
            sortable: true,
            minWidth: '200px',
            cell: row => (<div className="text-gray-800">{row.method || 'N/A'}</div>),
        },
        { 
            name: 'Endpoint', 
            selector: (row) => row.endpoint || 'N/A', 
            sortable: true,
            minWidth: '450px',
            cell: row => <div className="text-gray-800">{row.endpoint || 'N/A'}</div>,
        },
        { 
            name: 'Version', 
            selector: (row) => row.version || 'N/A', 
            sortable: true,
            minWidth: '130px',
            cell: row => <div className="text-gray-800 text-center">{row.version || 'N/A'}</div>,
        },
        { 
            name: 'Platform', 
            selector: (row) => row.platform || 'N/A', 
            sortable: true,
            minWidth: '200px',
            cell: row => <div className="text-gray-800 text-center">{row.platform || 'N/A'}</div>,
        },
        { 
            name: 'Status', 
            cell: (row) => (
                <span className={`px-2 py-1 self-center rounded-full flex items-center justify-center w-20 border ${row.status === 'active' ? 'bg-green/200 border-green/600 text-green/600' : 'bg-red/200 border-red/600 text-red/600'}`}>
                    {row.status || 'N/A'}
                </span>
            ),
            minWidth: '100px',
            center: true, 
        },
    ];

    // Tambahkan kolom "Actions" hanya jika roleId bukan 3
    if (roleId !== 3) {
        columns.push({
            name: 'Actions',
            cell: (row) => (
                <button onClick={() => onDeleteClick(row.id)}>
                    <Trash className="w-4 h-4 text-gray-500" />
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            minWidth: '100px',
        });
    }

    return (
        <div className="rounded-md">
            <DataTable
                columns={columns}
                data={data}
                pagination
                highlightOnHover
                responsive
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
                customStyles={{
                    headCells: {
                        style: {
                            fontSize: '15px',
                            fontWeight: '500',
                            textAlign: 'center',    
                            height: '40px',
                            borderBottom: '1px solid #d1d1d1',
                            margin: '0px'
                        },
                    },
                    head: {
                        style: {
                            paddingBottom: '0px',
                            height: '40px'
                        }
                    },
                    rows: {
                        style: {
                            fontSize: '14px',
                            fontWeight: '400',
                            paddingTop: '4px',
                            paddingBottom: '4px'
                        },
                    },
                    pagination: {
                        style: {
                            borderTop: '1px solid #e0e0e0',
                            padding: '10px',
                        },
                        pageButtonsStyle: {
                            borderRadius: '10px',
                            height: '40px',
                            width: '40px',
                            padding: '8px',
                            margin: '0 4px',
                            cursor: 'pointer',
                            transition: '0.3s',
                            color: '#737373',
                            border: '1px solid #e0e0e0'
                        },
                    },
                }}
                className="w-full mr-2"
            />
        </div>
    );
};

export default DataTableComponent;
