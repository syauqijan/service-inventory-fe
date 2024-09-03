"use client";
import React from "react";
import Modal from 'react-modal';
import { ApiDetails } from '../tables/service-api-detail-tables/types';

interface DetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    detailData: ApiDetails | null;
}

const DetailModal: React.FC<DetailModalProps> = ({ isOpen, onClose, detailData }) => {
    return (
        <Modal 
            isOpen={isOpen} 
            onRequestClose={onClose} 
            contentLabel="API Detail"
            className="fixed inset-0 flex items-center justify-center z-50"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"

        >
            {detailData && (
                <div className="bg-white rounded-lg shadow-lg px-7 py-8 w-2/3">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-bold">View API Detail</h2>
                    </div>
                    <p className="text-gray-500 mb-6">View an API details</p>
                    <div className='flex justify-start'>
                        <div className='w-2/5 mr-4'>
                            <div>
                                <label className="block text-sm font-medium mb-1">Endpoint</label>
                                <input
                                    type="text"
                                    value={detailData.endpoint} 
                                    className="w-full p-2 border border-gray-300 rounded-md mt-1"
                                    placeholder="Enter endpoint"
                                    readOnly
                                />
                            </div>
                            <div className='mt-3'>
                                <label className="block text-sm font-medium mb-1">Version</label>
                                <input
                                    type="text"
                                    value={detailData.version} 
                                    className="w-full px-2 py-1.5 border border-gray-300 rounded-md mt-1"
                                    placeholder="Enter endpoint"
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className='w-2/5 ml-4'>
                            <div>
                                <label className="block text-sm font-medium mb-1">Method</label>
                                <input
                                    type="text"
                                    value={detailData.method}
                                    className="w-full p-2 border border-gray-300 rounded-md mt-1"
                                    placeholder="Enter method"
                                    readOnly
                                />
                            </div>
                            <div className='mt-3'>
                                <label className="block text-sm font-medium mb-1">Platform</label>
                                <input
                                    type="text"
                                    value={detailData.platform}
                                    className="w-full px-2 py-1.5 border border-gray-300 rounded-md mt-1"
                                    placeholder="Enter method"
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className='w-1/5 ml-12'>
                            <label className="block text-sm font-medium mr-3">Status</label>
                            <p className={`font-bold text-lg ${detailData.status === "active" ? "text-green-600" : "text-red-600"}`}>
                                {detailData.status}
                            </p>
                        </div>
                    </div>

                    <div className="w-1/2 mt-4">
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                            value={detailData.description}
                            className="w-full p-2 border border-gray-300 rounded-md mt-1 min-h-20 max-h-40"
                            readOnly
                        />
                    </div>
                    <div className="flex justify-end mt-8">
                        <button onClick={onClose} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default DetailModal;
