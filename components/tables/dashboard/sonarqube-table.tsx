"use client";
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import axios from 'axios';
import { TableColumn } from 'react-data-table-component';
import { DataRowSonarqube } from './types';

// Dynamic import of DataTable
const DataTable = dynamic(() => import('react-data-table-component'), {
    ssr: false,
    loading: () => <p>Loading DataTable...</p>
});

const SonarQubeDataTable: React.FC = () => {
    const [data, setData] = useState<DataRowSonarqube[]>([]);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT_SERVICEAPIALL}`)
            .then((response) => {
                const transformedData = response.data.serviceapi.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    qualityGateStatus: item.sonarqube?.qualityGateStatus || 'N/A',
                    bugs: item.sonarqube?.bugs || 0,
                    vulnerabilities: item.sonarqube?.vulnerabilities || 0,
                    codesmell: item.sonarqube?.codesmell || 0,
                    coverage: item.sonarqube?.coverage || 0,
                    duplication: item.sonarqube?.duplication || 0,
                }));
                setData(transformedData);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const columns: TableColumn<any>[] = [
        {
            name: 'Service Name',
            selector: (row: DataRowSonarqube) => row.name,
            sortable: true,
            minWidth: '300px',
            cell: row => <div className="text-gray-800">{row.name}</div>,
        },
        {
            name: 'Quality Gate',
            selector: (row: DataRowSonarqube) => row.qualityGateStatus.toString(),
            sortable: true,
            minWidth: '200px',
            cell: row => <div className="text-gray-800">{row.qualityGateStatus}</div>,
        },
        {
            name: 'Bugs',
            selector: (row: DataRowSonarqube) => row.bugs.toString(),
            sortable: true,
            minWidth: '200px',
            cell: row => <div className="text-gray-800">{row.bugs}</div>,
        },
        {
            name: 'Vulnerabilities',
            selector: (row: DataRowSonarqube) => row.vulnerabilities.toString(),
            sortable: true,
            minWidth: '200px',
            cell: row => <div className="text-gray-800">{row.vulnerabilities}</div>,
        },
        {
            name: 'Code Smells',
            selector: (row: DataRowSonarqube) => row.codesmell.toString(),
            sortable: true,
            minWidth: '200px',
            cell: row => <div className="text-gray-800">{row.codesmell}</div>,
        },
        {
            name: 'Coverage',
            selector: (row: DataRowSonarqube) => row.coverage.toString(),
            sortable: true,
            minWidth: '200px',
            cell: row => <div className="text-gray-800">{row.coverage}</div>,
        },
        {
            name: 'Duplication',
            selector: (row: DataRowSonarqube) => row.duplication.toString(),
            sortable: true,
            minWidth: '200px',
            cell: row => <div className="text-gray-800">{row.duplication}</div>,
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

export default SonarQubeDataTable;
