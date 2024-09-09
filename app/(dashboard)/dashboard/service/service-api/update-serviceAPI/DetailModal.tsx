import React, { useState, useEffect } from 'react';
import { ApiDetails } from './types';

interface DetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    detailData: ApiDetails | null;
    onSave: (updatedData: ApiDetails, isNew: boolean) => void;
    isCreating: boolean;
}

const DetailModal: React.FC<DetailModalProps> = ({ isOpen, onClose, detailData, onSave, isCreating }) => {
    const [endpoint, setEndpoint] = useState('');
    const [version, setVersion] = useState('');
    const [customVersion, setCustomVersion] = useState('');
    const [method, setMethod] = useState('');
    const [platform, setPlatform] = useState('');
    const [status, setStatus] = useState(false);
    const [description, setDescription] = useState('');
    const [id, setID] = useState('');

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (detailData) {
            setEndpoint(detailData.endpoint || '');
            setID(detailData.id || `temp-${Math.random().toString(36).substr(2, 9)}`);
            setVersion(detailData.version || '');
            setMethod(detailData.method || '');
            setPlatform(detailData.platform || '');
            setStatus(detailData.status === 'active');
            setDescription(detailData.description || '');
        } else {
            // Reset fields for creating a new API
            setEndpoint('');
            setID(`temp-${Math.random().toString(36).substr(2, 9)}`);
            setVersion('');
            setMethod('');
            setPlatform('');
            setStatus(false);
            setDescription('');
        }
    }, [detailData]);

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!endpoint) newErrors.endpoint = 'Endpoint is required';
        if (!method) newErrors.method = 'Method is required';
        if (!description) newErrors.description = 'Description is required';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validateForm()) {
            return;
        }

        const updatedData: ApiDetails = {
            id: id,
            endpoint,
            version: version === 'custom' ? customVersion : version,
            method,
            platform,
            status: status ? 'active' : 'inactive',
            description,
            isNew: isCreating, // Pass the correct isNew value
        };

        console.log("Saving API data from modal:", updatedData);
        onSave(updatedData, isCreating); // Pass isCreating as the isNew parameter
        onClose(); // Close the modal
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 h-full flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg px-7 py-8 w-2/3">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-bold">{isCreating ? 'Add New API' : 'Edit API Detail'}</h2>
                    <button
                        onClick={onClose}
                        className="text-3xl text-gray-500 hover:text-gray-700 mt-[-20px]"
                    >
                        &times;
                    </button>
                </div>
                <p className="text-gray-500 mb-6">Enter API details</p>
                <div className="flex justify-start">
                    <div className="w-2/5 mr-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Endpoint</label>
                            <input
                                type="text"
                                value={endpoint}
                                onChange={(e) => setEndpoint(e.target.value)}
                                className={`w-full p-2 border ${errors.endpoint ? 'border-red-500' : 'border-gray-300'} rounded-md mt-1`}
                                placeholder="Enter endpoint"
                            />
                            {errors.endpoint && <p className="text-red-500 text-sm">{errors.endpoint}</p>}
                        </div>
                        <div className="mt-3">
                            <label className="block text-sm font-medium mb-1">Version</label>
                            <select
                                value={version}
                                onChange={(e) => setVersion(e.target.value)}
                                className={`w-full p-2 border ${errors.version ? 'border-red-500' : 'border-gray-300'} rounded-md mt-1`}
                            >
                                <option value="" disabled>
                                    Enter or select version
                                </option>
                                <option value="7.9">7.9</option>
                                <option value="8.0">8.0</option>
                                <option value="8.1">8.1</option>
                                <option value="custom">Custom</option>
                            </select>
                            {version === 'custom' && (
                                <input
                                    type="text"
                                    value={customVersion}
                                    onChange={(e) => setCustomVersion(e.target.value)}
                                    className={`w-full p-2 border ${errors.customVersion ? 'border-red-500' : 'border-gray-300'} rounded-md mt-2`}
                                    placeholder="Enter custom version"
                                />
                            )}
                            {errors.version && <p className="text-red-500 text-sm">{errors.version}</p>}
                            {errors.customVersion && <p className="text-red-500 text-sm">{errors.customVersion}</p>}
                        </div>
                    </div>
                    <div className="w-2/5 ml-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Method</label>
                            <select
                                value={method}
                                onChange={(e) => setMethod(e.target.value)}
                                className={`w-full p-2 border ${errors.method ? 'border-red-500' : 'border-gray-300'} rounded-md mt-1`}
                            >
                                <option value="" disabled>
                                    Select Method
                                </option>
                                <option value="Create">Create</option>
                                <option value="Read">Read</option>
                                <option value="Update">Update</option>
                                <option value="Delete">Delete</option>
                            </select>
                            {errors.method && <p className="text-red-500 text-sm">{errors.method}</p>}
                        </div>
                        <div className="mt-3">
                            <label className="block text-sm font-medium mb-1">Platform</label>
                            <select
                                value={platform}
                                onChange={(e) => setPlatform(e.target.value)}
                                className={`w-full p-2 border ${errors.platform ? 'border-red-500' : 'border-gray-300'} rounded-md mt-1`}
                            >
                                <option value="" disabled>
                                    Select platform
                                </option>
                                <option value="Web">Web</option>
                                <option value="Apps">Apps</option>
                            </select>
                            {errors.platform && <p className="text-red-500 text-sm">{errors.platform}</p>}
                        </div>
                    </div>
                    <div className="w-1/5 ml-12">
                        <label className="block text-sm font-medium mr-3">Status</label>
                        <div className="flex items-center mt-2">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={status}
                                    onChange={() => setStatus(!status)}
                                />
                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-gray-600 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                <span className="ml-3 text-sm font-medium text-gray-900">
                                    {status ? 'active' : 'inactive'}
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="w-1/2 mt-4">
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={`w-full p-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md mt-1 min-h-20 max-h-40`}
                        placeholder="Type your message here"
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>
                <div className="flex justify-end mt-8">
                    <button onClick={handleSave} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetailModal;
