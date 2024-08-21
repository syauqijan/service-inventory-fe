"use client";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import DataTableComponent from './DataTableComponent'; // Sesuaikan path sesuai dengan struktur proyek Anda
import DetailModal from '@/components/modal/DetailModal'; // Sesuaikan path sesuai dengan struktur proyek Anda
import { DataRow, ApiDetails } from './types';

interface ServiceAPIPageProps {
    serviceApiId: string; // Tambahkan prop serviceApiId
}

const ServiceAPIPage: React.FC<ServiceAPIPageProps> = ({ serviceApiId }) => {
    const [apiData, setApiData] = useState<DataRow[]>([]);
    const [filteredApiData, setFilteredApiData] = useState<DataRow[]>([]);
    const [apiLoading, setApiLoading] = useState(true);
    const [apiSearch, setApiSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedApiDetails, setSelectedApiDetails] = useState<ApiDetails | null>(null);

    useEffect(() => {
        const fetchServiceApiData = async (serviceApiId: string) => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT_APIS}/${serviceApiId}`);
                setApiData(response.data.rows || []);
                setFilteredApiData(response.data.rows || []);
            } catch (error) {
                console.error(error);
            } finally {
                setApiLoading(false);
            }
        };

        fetchServiceApiData(serviceApiId);
    }, [serviceApiId]);

    useEffect(() => {
        const filtered = apiData.filter(item => 
            item.service_api?.name.toLowerCase().includes(apiSearch.toLowerCase()) ||
            item.endpoint.toLowerCase().includes(apiSearch.toLowerCase()) ||
            item.method.toLowerCase().includes(apiSearch.toLowerCase())
        );
        setFilteredApiData(filtered);
    }, [apiSearch, apiData]);

    const handleOpenModal = (data: ApiDetails) => {
        console.log("Selected API Details:", data); // Debugging log
        setSelectedApiDetails(data);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedApiDetails(null);
    };

    return (
        <div>
            <div className="flex justify-end -mt-14 mb-3 mr-4 text-md">
                <input 
                    type="text"
                    placeholder="Search Api"
                    value={apiSearch}
                    onChange={(e) => setApiSearch(e.target.value)}
                    className="border px-4 py-2 rounded-lg"
                />
            </div>
            <hr className="border-neutral-200" />
            <DataTableComponent 
                data={filteredApiData} 
                onDetailClick={handleOpenModal} 
            />
            <DetailModal 
                isOpen={modalOpen} 
                onClose={handleCloseModal} 
                detailData={selectedApiDetails} 
            />
        </div>
    );
};

export default ServiceAPIPage;
