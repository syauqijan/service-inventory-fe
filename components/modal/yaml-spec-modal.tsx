import React from 'react';
import MonacoEditor from '@monaco-editor/react';

interface EditorPopupProps {
    isVisible: boolean;
    onClose: () => void;
    code: string;
    setCode: (code: string) => void;
    onSave: () => void; // Tambahkan props onSave
}

const EditorPopup: React.FC<EditorPopupProps> = ({ isVisible, onClose, code, setCode, onSave }) => {
    if (!isVisible) return null;

    const handleBackgroundClick = () => {
        onClose(); // Tutup pop-up ketika background diklik
    };

    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Mencegah penutupan pop-up ketika konten diklik
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
            onClick={handleBackgroundClick}>
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-4xl relative z-60" onClick={handleContentClick}>
                <button
                onClick={onClose}
                className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 text-3xl">
                    &times;
                </button>

                <h2 className="text-lg font-semibold mb-1">Add YAML</h2>
                <p className='text-sm mb-4'>Enter YAML Details</p>
                <MonacoEditor
                    height="400px"
                    defaultLanguage="yaml"
                    defaultValue={code}
                    theme="hc-black"
                    onChange={(value) => setCode(value || '')}
                />
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onSave}
                        className="px-4 py-2 bg-red-600 text-white rounded-md"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditorPopup;
