import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { ApiDetails } from './types';

interface DataTableComponentProps {
    data: ApiDetails[];
    onDetailClick: (data: ApiDetails) => void;
}

const DataTableComponent: React.FC<DataTableComponentProps> = ({ data, onDetailClick }) => {

    const columns: TableColumn<ApiDetails>[] = [
        {
            name: 'Method',
            selector: row => row.method,
            sortable: true,
            maxWidth: '250px',
        },
        {
            name: 'Endpoint',
            selector: row => row.endpoint,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
            maxWidth: '250px',
        },
        {
            name: 'Actions',
            cell: row => (
                <button onClick={() => onDetailClick(row)}>
                    Edit
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '200px',
        },
    ];

    return (
        <div>
        <DataTable
            columns={columns}
            data={data}
            pagination
            highlightOnHover
            pointerOnHover
            selectableRowsHighlight
            subHeader
            keyField="id" // Ensure each row has a unique key

            customStyles={{
                headCells: {
                    style: {
                        fontSize: '15px',
                        fontWeight: '700',
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
            className="w-full border-collapse -mt-10 border-t"
        />
        </div>
);
};

export default DataTableComponent;
