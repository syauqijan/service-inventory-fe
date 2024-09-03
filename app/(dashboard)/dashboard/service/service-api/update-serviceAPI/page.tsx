"use client";

import React, { useState, useEffect } from "react";
import axios from 'axios';
import DataTableComponent from './DataTableComponent';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Heading } from '@/components/ui/heading';
import DetailModal from "./DetailModal";
import EditServiceForm from '@/components/form/EditServiceForm';
import MonacoEditor from '@monaco-editor/react';
import { ApiDetails } from './types';
import { useRouter, useSearchParams } from 'next/navigation';
import { Plus } from "lucide-react";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";

interface ServiceAPIPageProps {
    params: {
        serviceApiId: string;
    };
}

const breadcrumbItems = [
    { title: 'Main', link: '/dashboard' },
    { title: 'Service', link: '/dashboard/service' },
    { title: 'Edit Service API', link: '/dashboard/service/service-web/update-serviceAPI' }
];

const generateTempId = () => `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const ServiceAPIPage: React.FC<ServiceAPIPageProps> = ({ params }) => {
    const { user } = useAuth();
    const { serviceApiId } = params;
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [existingApiData, setExistingApiData] = useState<ApiDetails[]>([]);
    const [newApiData, setNewApiData] = useState<ApiDetails[]>([]);
    const [apiLoading, setApiLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedApiDetails, setSelectedApiDetails] = useState<ApiDetails | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [initialData, setInitialData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [yamlSpec, setYamlSpec] = useState(''); 
    const [tempYamlSpec, setTempYamlSpec] = useState(''); 
    const [yamlEditorOpen, setYamlEditorOpen] = useState(false); 

    const userId = user?.userId;

    useEffect(() => {
        if (id) {
            fetchServiceData(id);
        }
    }, [id]);

    const fetchServiceData = async (serviceId: string) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT_SERVICEAPIS}/${serviceId}`);
            setInitialData(response.data);
            setYamlSpec(response.data.yamlSpec || '');
            setTempYamlSpec(response.data.yamlSpec || '');
            fetchApiData(serviceId); 
            setLoading(false); 
        } catch (error) {
            console.error('Error fetching service data:', error);
            setLoading(false); 
        }
    };

    const fetchApiData = async (serviceId: string) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT_APIS}/${serviceId}`);
            setExistingApiData(response.data.rows || []); 
            setApiLoading(false); 
        } catch (error) {
            console.error('Error fetching API data:', error);
            setApiLoading(false); 
        }
    };

    const handleOpenModal = (data: ApiDetails | null = null) => {
        if (data === null) {
            data = {
                id: generateTempId(),
                endpoint: '',
                version: '',
                method: '',
                platform: '',
                status: 'inactive',
                description: '',
                isNew: true, // New API is marked as isNew = true
            };
        }
    
        setSelectedApiDetails(data);
        setIsCreating(!!data.isNew); // Convert isNew to boolean explicitly
        setModalOpen(true);
    };
    

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedApiDetails(null);
    };

    const handleSaveLocal = (data: ApiDetails, isNew: boolean) => {
        console.log("Saving API data locally:", data, "Is new:", isNew);
    
        // Convert ID to string to safely use startsWith method
        const idAsString = String(data.id);
    
        // Determine if the API is new based on the presence of the `isNew` flag or an ID that starts with 'temp-'
        const isNewAPI = isNew || idAsString.startsWith('temp-');
    
        if (isNewAPI) {
            data.isNew = true; // Ensure isNew is set to true
            setNewApiData(prevData => {
                const updatedData = [...prevData.filter(item => item.id !== data.id), data];
                console.log("Updated newApiData after adding new API:", updatedData);
                return updatedData;
            });
        } else {
            setExistingApiData(prevData => {
                const updatedData = prevData.map(item => 
                    item.id === data.id ? { ...data, isModified: true, isNew: false } : item
                );
                console.log("Updated existingApiData after editing API:", updatedData);
                return updatedData;
            });
        }
    
        setModalOpen(false);
    };
    
    

    const handleUpdate = async (updatedData: any) => {
        try {
            const requests = [];
    
            // Update service API data
            requests.push(
                axios.patch(
                    `${process.env.NEXT_PUBLIC_API_ENDPOINT_SERVICEAPIS}/${id}`,
                    {
                        name: updatedData.name,
                        description: updatedData.description,
                        gitlabUrl: updatedData.gitlabUrl,
                        versionService: updatedData.versionService,
                        status: updatedData.status,
                        yamlSpec: yamlSpec,
                        ownerId: userId,
                    }
                )
            );
    
            // Update unit_testing data
            if (updatedData.unit_testing) {
                requests.push(
                    axios.patch(
                        `${process.env.NEXT_PUBLIC_API_ENDPOINT_UNITTESTING}/${updatedData.unit_testing.id}`,
                        updatedData.unit_testing
                    )
                );
            }
    
            // Update sonarqube data
            if (updatedData.sonarqube) {
                requests.push(
                    axios.patch(
                        `${process.env.NEXT_PUBLIC_API_ENDPOINT_SONARQUBE}/${updatedData.sonarqube.id}`,
                        updatedData.sonarqube
                    )
                );
            }
    
            // Create new APIs
            for (const apiData of newApiData) {
                requests.push(
                    axios.post(
                        `${process.env.NEXT_PUBLIC_API_ENDPOINT_APIS}/${serviceApiId || id}`,
                        apiData
                    )
                );
            }
    
            // Update existing APIs
            for (const apiData of existingApiData.filter(api => api.isModified)) {
                requests.push(
                    axios.patch(
                        `${process.env.NEXT_PUBLIC_API_ENDPOINT_APIS}/${apiData.id}`,
                        apiData
                    )
                );
            }
    
            // Execute all requests
            await Promise.all(requests);
    
            toast.success('Service API Updated');
            router.push(`/dashboard/service/service-api/view-serviceAPI?id=${id}`); // Refresh the page with the query params intact
        } catch (error) {
            console.error('Error saving data:', error);
            toast.error('Failed to save data');
        }
    };

    const handleOpenYamlEditor = () => {
        setTempYamlSpec(yamlSpec);
        setYamlEditorOpen(true);
    };

    const handleCloseYamlEditor = () => {
        setYamlEditorOpen(false);
    };

    const handleYamlChange = (newYaml: string) => {
        setTempYamlSpec(newYaml);
    };

    const handleSaveYaml = () => {
        setYamlSpec(tempYamlSpec);
        handleCloseYamlEditor();
    };

    if (loading || apiLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex-1 px-4 md:p-8">
            <div className="space-y-4">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="flex items-start justify-between">
                    <Heading
                        title="Edit Service API"
                        description="Edit new service API"
                    />
                </div>
                <hr className="border-neutral-200" />

                {id && initialData && (
                    <div>
                        <EditServiceForm 
                            initialData={initialData} 
                            onSubmit={handleUpdate} 
                            yamlSpec={yamlSpec}
                            onYamlSpecChange={handleOpenYamlEditor}
                        />
                    </div>
                )}
                <div>
                    <div className='flex justify-start'>
                        <div className='w-1/2'>
                            <h1 className='text-xl font-semibold mt-3'>
                                APIs
                            </h1>
                            <p className='mt-1 text-gray-500 font-normal'>Add connected API</p>
                        </div>
                        <div className='w-1/2 flex justify-end mt-2 mr-6'>
                            <button onClick={() => handleOpenModal()} className="mt-3 justify-center items-center inline-flex w-20 h-10 bg-white border-2 text-black px-1 py-1 rounded-md font-semibold">
                                <Plus className="mr-2 h-4 w-4" /> Add
                            </button>
                        </div>
                    </div>
                    <div className="mr-8">
                        <DataTableComponent 
                        data={existingApiData.concat(newApiData)} 
                        onDetailClick={handleOpenModal} 
                        />
                    </div>
                </div>
                
                <div className='mt-20 flex justify-between pr-16 text-sm'>
                    <p className='active:scale-95 min-w-16 form-flex justify-center items-center py-3 px-4 gap-2 cursor-pointer rounded-md shadow-sm text-red-600 bg-white border border-red-600 w-20 mt-3 mb-1 ml-3 font-semibold text-center' onClick={() => router.back()}>Cancel</p>
                    <button 
                        type="submit" 
                        className="active:scale-95 min-w-16 form-flex justify-center items-center border py-3 px-4 gap-2 cursor-pointer rounded-md shadow-sm text-white bg-red-600 w-20 mt-3 mb-1 ml-3 font-semibold"
                        onClick={() => document.querySelector('form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
                    >
                        Save
                    </button>
                </div>
            </div>
            <DetailModal 
                isOpen={modalOpen} 
                onClose={handleCloseModal} 
                detailData={selectedApiDetails} 
                onSave={handleSaveLocal} 
                isCreating={isCreating} 
            />

            {yamlEditorOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-4xl relative z-60">
                        <button
                            onClick={handleCloseYamlEditor}
                            className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 text-3xl">
                                &times;
                        </button>
                        <h2 className="text-lg font-bold mb-1">Edit YAML</h2>
                        <p className='text-sm mb-4'>Edit YAML Details</p>
                        <MonacoEditor
                            height="400px"
                            defaultLanguage="yaml"
                            value={tempYamlSpec}
                            theme="hc-black"
                            onChange={(value) => handleYamlChange(value || '')}
                        />
                        <div className="mt-4 flex justify-end space-x-4">
                            <button 
                                onClick={handleSaveYaml}
                                className="px-4 py-2 bg-red-600 text-white rounded-md"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceAPIPage;
