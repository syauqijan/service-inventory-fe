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
            style={{
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    width: '950px',
                    overflowX: 'hidden',
                    zIndex: '50',
                }
            }}
        >
            {detailData && (
                <>
                    <form>
                        <h1 className="font-semibold text-2xl">API Details</h1>
                        <div className="mt-2">
                            <div className="w-full font-normal text-slate-600 text-sm">
                                <p>{detailData.description}</p>
                            </div>
                            <h2 className="font-semibold mt-6 text-sm">Endpoint:</h2>
                            <textarea 
                                value={detailData.endpoint} 
                                className="rounded-md w-full text-sm font-normal text-slate-600 p-1 mt-2 max-h-60 border-2 min-h-20"
                                readOnly
                            />
                        </div>
                        <div className="flex items-stretch mt-4 mb-4 text-sm">
                            <div className="w-1/4">
                                <div className="text-left">
                                    <p className="font-semibold">Version:</p>
                                    <p className="mt-1">{detailData.version}</p>
                                </div>
                            </div>
                            <div className="w-1/4">
                                <div className="text-left">
                                    <p className="font-semibold">Method:</p>
                                    <p className="mt-1">{detailData.method}</p>
                                </div>
                            </div>
                            <div className="w-1/4">
                                <div className="text-left">
                                    <p className="font-semibold">Platform:</p>
                                    <p className="mt-1">{detailData.platform}</p>
                                </div>
                            </div>
                            <div className="w-1/4">
                                <div className="text-left">
                                    <p className="font-semibold">Status:</p>
                                    <p className="mt-1">{detailData.status}</p>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="flex justify-end mx-3">
                        <button 
                            onClick={onClose} 
                            className="active:scale-95 min-w-[22px] form-flex justify-center items-center text-center border py-2 px-2 gap-2 cursor-pointer rounded-md shadow-sm text-white bg-red-600 w-28 mt-3 mb-1 font-semibold"
                        >
                            Close
                        </button>
                    </div>
                </>
            )}
        </Modal>
    );
};

export default DetailModal;
