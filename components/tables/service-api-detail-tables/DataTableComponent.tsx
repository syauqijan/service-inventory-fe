import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { DataRow } from './types';

interface DataTableComponentProps {
    data: DataRow[];
    onDetailClick: (data: DataRow) => void;
}

const DataTableComponent: React.FC<DataTableComponentProps> = ({ data, onDetailClick }) => {
    const columns: TableColumn<DataRow>[] = [
        {
            name: 'Method',
            selector: (row: DataRow) => row.method,
            sortable: true,
            maxWidth: '250px',
        },
        {
            name: 'Endpoint',
            selector: (row: DataRow) => row.endpoint,
            sortable: true,
        },
        {
            name: 'Status',
            selector: (row: DataRow) => row.status,
            sortable: true,
            maxWidth: '250px',
        },
        {
            name: 'Actions',
            cell: (row: DataRow) => (
                <button onClick={() => onDetailClick(row)}>Detail</button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            maxWidth: '250px',
        },
    ];

    return (
        <DataTable<DataRow>
            columns={columns}
            data={data}
            pagination
            highlightOnHover
            customStyles={{
                headCells: {
                    style: {
                        fontSize: '15px',
                        fontWeight: '600',
                        textAlign: 'center', // Mengatur teks header kolom "Status" ke tengah    
                    },
                },
                rows: {
                    style: {
                        minHeight: '50px',
                        fontSize: '14px',
                    },
                },
            }}
            className="w-full border-collapse"
        />
    );
};

export default DataTableComponent;
