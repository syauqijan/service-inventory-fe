"use client";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import DataTableComponent from './DataTableComponent';
import { AlertModalApi } from '@/components/modal/alert-api-modal';
import { DataRow } from './types';
import { toast } from "sonner";
import useAuth from '@/hooks/useAuth'; // Pastikan hook ini tersedia atau sesuaikan dengan cara Anda mendapatkan user data

const ServiceAPIPage: React.FC = () => {
    const { user } = useAuth();
    const [apiData, setApiData] = useState<DataRow[]>([]);
    const [filteredApiData, setFilteredApiData] = useState<DataRow[]>([]);
    const [apiSearch, setApiSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedApiId, setSelectedApiId] = useState<string | null>(null);
    const [roleId, setRoleId] = useState<number | null>(null); // State untuk menyimpan roleId

    const fetchAllServiceApiData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT_APIS}`);
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
        const fetchUserRole = async () => {
            if (user?.userId) {
                try {
                    const userRoleResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT_USERS}/${user.userId}`);
                    setRoleId(userRoleResponse.data.roleId);
                } catch (error) {
                    console.error("Error fetching role ID:", error);
                }
            }
        };

        fetchUserRole();
    }, [user]);

    useEffect(() => {
        const filtered = apiData.filter(item => 
            item.service_api?.name.toLowerCase().includes(apiSearch.toLowerCase()) ||
            item.endpoint.toLowerCase().includes(apiSearch.toLowerCase()) ||
            item.method.toLowerCase().includes(apiSearch.toLowerCase()) ||
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
            <input 
                type="text"
                placeholder="Search API..."
                value={apiSearch}
                onChange={(e) => setApiSearch(e.target.value)}
                className="border px-3 pb-2 pt-1.5 rounded-md text-sm w-full md:max-w-sm mb-4 shadow-sm"
            />
            {roleId !== null && (
                <DataTableComponent 
                    data={filteredApiData}
                    onDeleteClick={handleDeleteClick}
                    roleId={roleId} // Pass roleId sebagai prop
                />
            )}
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
