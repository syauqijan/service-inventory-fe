import React, { useState } from 'react';

interface FilterModalProps {
    show: boolean;
    handleClose: () => void;
    handleApply: (filters: any) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ show, handleClose, handleApply }) => {
    const [serviceName, setServiceName] = useState("");
    const [method, setMethod] = useState("");
    const [endpoint, setEndpoint] = useState("");
    const [status, setStatus] = useState("");
    const [version, setVersion] = useState("");
    const [platform, setPlatform] = useState("");

    const applyFilters = () => {
        const filters = {
            serviceName,
            method,
            endpoint,
            status,
            version,
            platform,
        };
        handleApply(filters);
        handleClose();
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg w-96 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Filter</h3>
                    <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Service Name</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Find service"
                            value={serviceName}
                            onChange={(e) => setServiceName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Method</label>
                        <select
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={method}
                            onChange={(e) => setMethod(e.target.value)}
                        >
                            <option value="">Select method</option>
                            {/* Tambahkan opsi method yang tersedia */}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Endpoint</label>
                        <input
                            type="text"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Find endpoint"
                            value={endpoint}
                            onChange={(e) => setEndpoint(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">Select status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Version</label>
                        <select
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={version}
                            onChange={(e) => setVersion(e.target.value)}
                        >
                            <option value="">Select version</option>
                            {/* Tambahkan opsi version yang tersedia */}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Platform</label>
                        <select
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value)}
                        >
                            <option value="">Select platform</option>
                            {/* Tambahkan opsi platform yang tersedia */}
                        </select>
                    </div>
                </div>
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={applyFilters}
                        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;
