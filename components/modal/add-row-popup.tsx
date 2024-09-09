import React from 'react';

interface AddRowPopupProps {
    isVisible: boolean;
    onClose: () => void;
    onAddRow: (newRow: {
        method: string;
        endpoint: string;
        status: string;
        description: string;
        version: string;
        platform: string;
    }) => void;
    method: string;
    setMethod: React.Dispatch<React.SetStateAction<string>>;
    endpoint: string;
    setEndpoint: React.Dispatch<React.SetStateAction<string>>;
    status: boolean;
    setStatus: React.Dispatch<React.SetStateAction<boolean>>;
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;
    version: string;
    setVersion: React.Dispatch<React.SetStateAction<string>>;
    customVersion: string;
    setCustomVersion: React.Dispatch<React.SetStateAction<string>>;
    platform: string;
    setPlatform: React.Dispatch<React.SetStateAction<string>>;
    onSave: () => void;
}

const AddRowPopup: React.FC<AddRowPopupProps> = ({
    isVisible, 
    onClose, 
    onAddRow,
    method,
    setMethod,
    endpoint,
    setEndpoint,
    status,
    setStatus,
    description,
    setDescription,
    version,
    setVersion,
    customVersion,
    setCustomVersion,
    platform,
    setPlatform,
    onSave
}) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg px-7 py-8 w-2/3">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-bold">Add/Edit API Detail</h2>
                    <button
                        onClick={onClose}
                        className="text-3xl text-gray-500 hover:text-gray-700 mt-[-20px]"
                    >
                        &times;
                    </button>
                </div>
                <p className="text-gray-500 mb-6">Enter API details</p>
                <div className='flex justify-start'>
                    <div className='w-2/5 mr-4'>
                        <div>
                            <label className="block text-sm font-medium mb-1">Endpoint</label>
                            <input
                                type="text"
                                value={endpoint}
                                onChange={(e) => setEndpoint(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md mt-1"
                                placeholder="Enter endpoint"
                            />
                        </div>
                        <div className='mt-3'>
                            <label className="block text-sm font-medium mb-1">Version</label>
                            <select
                                value={version}
                                onChange={(e) => setVersion(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md mt-1"
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
                                    className="w-full p-2 border border-gray-300 rounded-md mt-2"
                                    placeholder="Enter custom version"
                                />
                            )}
                        </div>
                    </div>
                    <div className='w-2/5 ml-4'>
                        <div>
                            <label className="block text-sm font-medium mb-1">Method</label>
                            <select
                                value={method}
                                onChange={(e) => setMethod(e.target.value)}
                                className={`w-full p-2 border rounded-md mt-1`}
                            >
                                <option value="" disabled>
                                    Select Method
                                </option>
                                <option value="Create">Create</option>
                                <option value="Read">Read</option>
                                <option value="Update">Update</option>
                                <option value="Delete">Delete</option>
                            </select>
                        </div>
                        <div className='mt-3'>
                            <label className="block text-sm font-medium mb-1">Platform</label>
                            <select
                                value={platform}
                                onChange={(e) => setPlatform(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md mt-1"
                            >
                                <option value="" disabled>
                                    Select platform
                                </option>
                                <option value="Web">Web</option>
                                <option value="Apps">Apps</option>
                                {/* Add more platforms as needed */}
                            </select>
                        </div>
                    </div>
                    <div className='w-1/5 ml-12'>
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
                        className="w-full p-2 border border-gray-300 rounded-md mt-1 min-h-20 max-h-40"
                        placeholder="Type your message here"
                    />
                </div>
                <div className="flex justify-end mt-8">
                    <button onClick={onSave} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddRowPopup;
