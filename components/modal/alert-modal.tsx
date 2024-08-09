'use client';
import { useEffect, useState } from 'react';
import { Modal } from '@/components/ui/modal';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
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
      title="Are you sure to delete this service?"
      description="This action cannot be undone and will delete the service data from the table."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <button disabled={loading} onClick={onClose} className='w-[79px] h-[35px] rounded-md border border-RedTint/900 text-RedTint/900 text-sm font-medium '>
          Cancel
        </button>
        <button disabled={loading} onClick={onConfirm} className='w-[79px] h-[35px] rounded-md bg-RedTint/900 text-white text-sm font-medium leading-normal'>
          Yes
        </button>
      </div>
    </Modal>
  );
};
