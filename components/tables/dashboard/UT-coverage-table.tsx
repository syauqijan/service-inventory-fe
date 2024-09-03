"use client";
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import axios from 'axios';
import { TableColumn } from 'react-data-table-component';
import { DataRow } from './types';

// Dynamic import of DataTable
const DataTable = dynamic(() => import('react-data-table-component'), {
    ssr: false,
    loading: () => <p>Loading DataTable...</p>
});

const UnitTestDataTable: React.FC = () => {
    const [data, setData] = useState<DataRow[]>([]);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT_SERVICEAPIALL}`)
            .then((response) => {
                const transformedData = response.data.serviceapi.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    testCasePassed: item.unit_testing.testCasePassed,
                    testCaseFailed: item.unit_testing.testCaseFailed,
                    coverageStatement: item.unit_testing.coverageStatement,
                    coverageBranch: item.unit_testing.coverageBranch,
                    coverageFunction: item.unit_testing.coverageFunction,
                    coverageLines: item.unit_testing.coverageLines,
                }));
                setData(transformedData);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const columns: TableColumn<any>[] = [
        {
            name: 'Service Name',
            selector: (row: DataRow) => row.name,
            sortable: true,
            minWidth: '300px',
            cell: row => <div className="text-gray-800">{row.name}</div>,
        },
        {
            name: 'Coverage Statement',
            selector: (row: DataRow) => row.coverageStatement.toString(),
            sortable: true,
            minWidth: '225px',
            cell: row => <div className="text-gray-800">{row.coverageStatement}%</div>,
        },
        {
            name: 'Coverage Branch',
            selector: (row: DataRow) => row.coverageBranch.toString(),
            sortable: true,
            minWidth: '200px',
            cell: row => <div className="text-gray-800">{row.coverageBranch}%</div>,
        },
        {
            name: 'Coverage Lines',
            selector: (row: DataRow) => row.coverageLines.toString(),
            sortable: true,
            minWidth: '200px',
            cell: row => <div className="text-gray-800">{row.coverageLines}%</div>,
        },
        {
            name: 'Coverage Function',
            selector: (row: DataRow) => row.coverageFunction.toString(),
            sortable: true,
            minWidth: '225px',
            cell: row => <div className="text-gray-800">{row.coverageFunction}%</div>,
        },
        {
            name: 'Test Case Passed',
            selector: (row: DataRow) => row.testCasePassed.toString(),
            sortable: true,
            minWidth: '200px',
            cell: row => <div className="text-gray-800">{row.testCasePassed}</div>,
        },
        {
            name: 'Test Case Failed',
            selector: (row: DataRow) => row.testCaseFailed.toString(),
            sortable: true,
            minWidth: '200px',
            cell: row => <div className="text-gray-800">{row.testCaseFailed}</div>,
        },
    ];

    return (
        <div className="rounded-md">
            <DataTable
                columns={columns}
                data={data}
                pagination
                highlightOnHover
                responsive
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10, 20, 30]}
                customStyles={{
                    headCells: {
                        style: {
                            fontSize: '16px', // Use Tailwind's 'text-md' class
                            fontWeight: '600',
                            textAlign: 'center',
                            paddingLeft: '20px',
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
                            paddingLeft: '3px',
                            minHeight: '45px',
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

export default UnitTestDataTable;
