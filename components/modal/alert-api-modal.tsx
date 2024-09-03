'use client';
import { useEffect, useState } from 'react';
import { Modal } from '@/components/ui/modal';

interface AlertModalApiProps {
    isOpenApi: boolean;
    onCloseApi: () => void;
    onConfirmApi: () => void;
    loading: boolean;
}

export const AlertModalApi: React.FC<AlertModalApiProps> = ({
    isOpenApi,
    onCloseApi,
    onConfirmApi,
    loading
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Modal
            title="Are you sure to delete Data?"
            description="This action cannot be undone and will delete data from the table."
            isOpen={isOpenApi}
            onClose={onCloseApi}
        >
            <div className="flex w-full items-center justify-end space-x-2 pt-6">
                <button disabled={loading} onClick={onCloseApi} className='w-[79px] h-[35px] rounded-md border border-RedTint/900 text-RedTint/900 text-sm font-medium '>
                    Cancel
                </button>
                <button disabled={loading} onClick={onConfirmApi} className='w-[79px] h-[35px] rounded-md bg-RedTint/900 text-white text-sm font-medium leading-normal'>
                    Yes
                </button>
            </div>
        </Modal>
    );
};
