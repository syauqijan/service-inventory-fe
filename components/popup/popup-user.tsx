import React from 'react';
import { useState } from 'react';

interface PopupUserProps {
  isVisible: boolean;
  onClose: () => void;
}

const PopupUser: React.FC<PopupUserProps> = ({ isVisible, onClose }) => {
  const [isEmailCreateValid, setIsEmailCreateValid] = useState<boolean>(true);

  const validateCreateEmail = (Createemail: string): void => {
    const emailCreateRegex = /^[\w-\.]+@phincon\.com$/;
    setIsEmailCreateValid(emailCreateRegex.test(Createemail));
  };

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-25 z-40"></div>
      )}
      <div className={`min-w-[425px] h-[400px] text-gray-800 text-sm font-normal flex flex-col gap-5 box-border shadow-sm rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 translate-middle bg-white pb-5 pl-7 pr-5 w-fit z-50 ${isVisible ? 'block' : 'hidden'}`}>
        <div className="mr-2">
          <div className="font-semibold text-left text-lg mt-3">
            Create New User
          </div>
          <div className="mb-3">
            <p className="text-slate-500 mt-2 text-sm font-normal leading-tight">
              Register new account with specified role to access.
            </p>
          </div>
          <form className="flex flex-col">
            <div className="flex flex-col gap-0.5 justify-end">
              <div className="flex justify-end mt-3">
                <label htmlFor="name" className="block mb-1.5 font-medium text-sm mt-3 ml-7">Name</label>
                <input type="text" id="name" name="name" placeholder="Enter name" className="placeholder:opacity-50 py-3 px-4 rounded-md border border-slate-300 focus:outline-none focus:border-sky-900 w-2/3 ml-5" />
              </div>
              <div className="flex justify-end mt-3">
                <label htmlFor="Createemail" className="block mb-1.5 font-medium text-sm mt-3 ml-8">Email</label>
                <input type="text" id="Createemail" name="Createemail" placeholder="Enter email" className={`${isEmailCreateValid ? 'focus:border-emerald-500' : 'focus:border-red-400 border-red-400'} emailcustom placeholder:opacity-50 py-3 px-4 rounded-md border border-slate-300 focus:outline-none w-2/3 ml-5`}
                  onInput={(e) => validateCreateEmail((e.target as HTMLInputElement).value)}
                />
              </div>
              <div className="flex justify-end mt-3">
                <label htmlFor="password" className="block mb-1.5 font-medium text-sm mt-3">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter password" className="placeholder:opacity-50 py-3 px-4 rounded-md border border-slate-300 focus:outline-none focus:border-sky-900 w-2/3 ml-5" />
              </div>
              <div className="flex justify-end mt-3">
                <label htmlFor="role" className="block mb-1.5 font-medium text-sm mt-3 ml-10">Role</label>
                <select name="role" id="role" className="py-3 px-4 rounded-md border border-slate-300 focus:outline-none focus:border-sky-900 w-2/3 ml-5">
                <option value="" disabled selected>Select Role</option> 
                  <option value="Developer">Developer</option>
                  <option value="Manager">Project Manager</option>
                </select>
              </div>
            </div>
          </form>
          <div className="flex justify-end mt-4">
            <button className="active:scale-95 min-w-16 form-flex justify-center items-center font-medium text-sm border py-3 px-4 gap-2 cursor-pointer rounded-md shadow-sm text-white bg-black w-1/5 mt-3 mb-1 ml-3" onClick={onClose}>Save</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopupUser;
