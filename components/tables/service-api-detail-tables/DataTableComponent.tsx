"use client";
import React from "react";
import dynamic from 'next/dynamic';
import { TableColumn } from 'react-data-table-component';
import { DataRow, ApiDetails } from './types';

// Dynamic import of DataTable
const DataTable = dynamic(() => import('react-data-table-component'), {
    ssr: false,
    loading: () => <p>Loading DataTable...</p>
});

interface DataTableComponentProps {
    data: DataRow[];
    onDetailClick: (data: ApiDetails) => void;
}

const DataTableComponent: React.FC<DataTableComponentProps> = ({ data, onDetailClick }) => {
    const columns: TableColumn<DataRow>[] = [
        { 
            name: 'Method', 
            selector: (row) => row.method || 'N/A', 
            sortable: true,
            maxWidth: '250px',
            cell: row => (<div className="text-gray-800">{row.method || 'N/A'}</div>),
        },
        { 
            name: 'Endpoint', 
            selector: (row) => row.endpoint || 'N/A', 
            sortable: true,
            minWidth: '300px',
            cell: row => <div className="text-gray-800">{row.endpoint || 'N/A'}</div>,
        },
        { 
            name: 'Status', 
            cell: (row) => (
                <span className={`px-2 py-1 self-center rounded-full flex items-center justify-center w-20 border ${row.status === 'active' ? 'bg-green/200 border-green/600 text-green/600' : 'bg-red/200 border-red/600 text-red/600'}`}>
                    {row.status || 'N/A'}
                </span>
            ),
            minWidth: '100px',
            center: true, // Mengatur teks dalam sel ke tengah
        },
        {
            name: 'Detail',
            cell: (row) => (
                <button 
                    onClick={() => onDetailClick(row as ApiDetails)} // Pastikan row adalah ApiDetails
                    className="focus:outline-none"
                >
                    View Detail
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            minWidth: '150px',
        }
    ];

    return (
        <div className="pr-4">
            <DataTable
                columns= {columns}
                data={data}
                pagination
                highlightOnHover
                responsive
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5, 10, 20]}
                customStyles={{
                    headCells: {
                        style: {
                            fontSize: '14px',
                            fontWeight: '500',
                            textAlign: 'center', // Mengatur teks header kolom "Status" ke tengah    
                        },
                    },
                    rows: {
                        style: {
                            minHeight: '50px',
                            fontSize: '13px',
                        },
                    },
                }}
                className="w-full border-collapse"
            />
        </div>
    );
};

export default DataTableComponent;
