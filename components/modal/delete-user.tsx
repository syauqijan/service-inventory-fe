import React from 'react';

interface DeleteUserProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteUser: React.FC<DeleteUserProps> = ({ isVisible, onClose, onConfirm }) => {
  return (
    <>
    {isVisible && (
        <div
        className="bg-black/25 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 translate-middle w-screen h-screen z-30"
        onClick={onClose}
        ></div>
    )}
    <div className={`min-w-72 text-gray-800 text-sm font-normal flex flex-col gap-5 box-border shadow-sm rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 translate-middle bg-white pb-5 pl-10 pr-10 w-2/5 z-40
        ${isVisible ? 'block' : 'hidden'}`}>
        <div className="font-semibold text-left mt-7 text-xl">
        Are you sure to delete this user account?
        </div>
        <div className="mb-3">
        <p className="text-slate-400 mt-2 text-base">
            This action cannot be undone. This will permanently delete the account and remove the data from our servers.
        </p>
        </div>
        <div className="flex justify-end">
        <button
            className="active:scale-95 form-flex justify-center items-center border py-3 px-4 gap-2 cursor-pointer rounded-md shadow-sm text-black bg-white w-20 mt-3 mb-3 font-semibold"
            onClick={onClose}
        >
            Cancel
        </button>
        <button
            className="active:scale-95 form-flex justify-center items-center font-normal border py-3 px-4 gap-2 cursor-pointer rounded-md shadow-sm text-white bg-RedTint/900 w-16 m-3"
            onClick={onConfirm}
        >
            Yes
        </button>
        </div>
    </div>
    </>
);
};

export default DeleteUser;
