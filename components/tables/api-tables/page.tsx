"use client";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import DataTableComponent from './DataTableComponent';
import { AlertModalApi } from '@/components/modal/alert-api-modal'; // Pastikan path sesuai dengan struktur proyek Anda
import { DataRow } from './types';
import { toast } from "sonner";

const ServiceAPIPage: React.FC = () => {
    const [apiData, setApiData] = useState<DataRow[]>([]);
    const [filteredApiData, setFilteredApiData] = useState<DataRow[]>([]);
    const [apiSearch, setApiSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedApiId, setSelectedApiId] = useState<string | null>(null);

    const fetchAllServiceApiData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT_APIS}?limit=100`);
            setApiData(response.data.api || []);
            setFilteredApiData(response.data.api || []);
        } catch (error) {
            console.error("Error fetching service API data:", error);
        }
    };

    useEffect(() => {
        fetchAllServiceApiData();
    }, []);

    useEffect(() => {
        const filtered = apiData.filter(item => 
            item.service_api?.name.toLowerCase().includes(apiSearch.toLowerCase()) ||
            item.endpoint.toLowerCase().includes(apiSearch.toLowerCase()) ||
            item.method.toLowerCase().includes(apiSearch.toLowerCase()) ||
            // item.description.toLowerCase().includes(apiSearch.toLowerCase()) ||
            item.version.toLowerCase().includes(apiSearch.toLowerCase()) ||
            item.platform.toLowerCase().includes(apiSearch.toLowerCase()) ||
            item.status.toLowerCase().includes(apiSearch.toLowerCase())
        );
        setFilteredApiData(filtered);
    }, [apiSearch, apiData]);

    const handleDeleteClick = (id: string) => {
        setSelectedApiId(id);
        setModalOpen(true);
    };


    const handleConfirmDelete = async () => {
        if (!selectedApiId) return;

        setLoading(true);

        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_ENDPOINT_APIS}/${selectedApiId}`);
            setApiData(apiData.filter(item => item.id !== selectedApiId));
            setFilteredApiData(filteredApiData.filter(item => item.id !== selectedApiId));
            toast.success('Services deleted successfully');
        } catch (error) {
            console.error("Failed to delete the record:", error);
            toast.error('Failed to delete api');
        } finally {
            setLoading(false);
            setModalOpen(false);
            setSelectedApiId(null);
        }
    };

    return (
        <div>
            <div className="flex justify-start mb-5 mr-4 text-md">
                <input 
                    type="text"
                    placeholder="Search API..."
                    value={apiSearch}
                    onChange={(e) => setApiSearch(e.target.value)}
                    className="border px-3 py-2 rounded-lg text-sm"
                />
            </div>
            <DataTableComponent 
                data={filteredApiData}
                onDeleteClick={handleDeleteClick} // Gunakan handleDeleteClick
            />
            <AlertModalApi 
                isOpenApi={modalOpen}
                onCloseApi={() => setModalOpen(false)}
                onConfirmApi={handleConfirmDelete}
                loading={loading}
            />
        </div>
    );
};

export default ServiceAPIPage;
