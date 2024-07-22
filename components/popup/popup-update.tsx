import React from 'react';
import { useState } from 'react';

interface PopupUpdateProps {
  isUpdateVisible: boolean;
  onClose: () => void;
}

const PopupUpdate: React.FC<PopupUpdateProps> = ({ isUpdateVisible, onClose }) => {
    const [isEmailUpdateValid, setIsEmailUpdateValid] = useState<boolean>(false);
    const [isNameUpdateValid, setIsNameUpdateValid] = useState<boolean>(false);
    const [isPassUpdateValid, setIsPassUpdateValid] = useState<boolean>(false);

    const validateUpdateEmail = (Updateemail: string): void => {
        const emailUpdateRegex = /^[\w-\.]+@phincon\.com$/;
        setIsEmailUpdateValid(emailUpdateRegex.test(Updateemail));
    };

    const validateUpdateName = (Updatename: string): void => {
        const nameUpdateRegex = /^.{1,30}$/;
        setIsNameUpdateValid(nameUpdateRegex.test(Updatename));
    };
  
    const validateUpdatePass = (Updatepass: string): void => {
      const passUpdateRegex = /^.{8,}$/;
      setIsPassUpdateValid(passUpdateRegex.test(Updatepass));
    };

    const updateSubmit = () => {
        if (isEmailUpdateValid && isNameUpdateValid && isPassUpdateValid) {
            onClose();
        }
      };

  return (
    <>
      {isUpdateVisible && (
        <div className='bg-black/25 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 translate-middle w-screen h-screen z-40' onClick={onClose}></div>
      )}
      <div className= {`min-w-72 bg-white text-gray-800 text-sm font-normal flex flex-col gap-5 box-border shadow-sm rounded-xl z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 translate-middle bg-white pb-5 pl-7 pr-5 w-fit" ${isUpdateVisible ? 'block' : 'hidden'}`}>
                    <div className="mr-2">
                        <div className="font-semibold text-left mt-7 text-xl mt-3 flex justify-between">
                            Update User Account
                            <button className='mb-2 mr-2' onClick={onClose}>
                                X
                            </button>
                        </div>
                        <div className="mb-3">
                            <p className="text-slate-400 mt-2 text-base">
                            Update account info with specified role to access.
                            </p>
                        </div>
                        <form className="flex flex-col">
                            <div className="flex flex-col gap-0.5 justify-end">
                                <div className="flex justify-end mt-3">
                                    <div className='ml-3 w-1/5'>
                                        <label htmlFor="email" className="block mb-1.5 font-medium text-sm mt-3 text-right">Name</label>
                                    </div>
                                    <div className="ml-3 w-4/5">
                                        <input type="text" id="updatename" name="updatename" placeholder="Name" className={`${isNameUpdateValid ? 'focus:border-sky-900' : 'focus:border-red-400 border-red-400'} emailcustom placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid border-neutral-300 focus:outline-none w-full`}
                                        onInput={(e) => validateUpdateName((e.target as HTMLInputElement).value)}/>
                                        <p className={`text-xs ${isNameUpdateValid ? 'text-green-500' : 'text-red-500'} mt-1`}>
                                            {isNameUpdateValid ? '' : 'Name is invalid'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-end mt-3">
                                    <div className='ml-3 w-1/5'>
                                        <label htmlFor="email" className="block mb-1.5 font-medium text-sm mt-3 text-right">email</label>
                                    </div>
                                    <div className="ml-3 w-4/5">
                                        <input type="text" id="Updateemail" name="Updateemail" placeholder="email" className={`${isEmailUpdateValid ? 'focus:border-sky-900' : 'focus:border-red-400 border-red-400'} emailcustom placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid border-neutral-300 focus:outline-none w-full`}
                                        onInput={(e) => validateUpdateEmail((e.target as HTMLInputElement).value)}/>
                                        <p className={`text-xs ${isEmailUpdateValid ? 'text-green-500' : 'text-red-500'} mt-1`}>
                                            {isEmailUpdateValid ? '' : 'Email is invalid'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-end mt-3">
                                    <div className='ml-3 w-1/5'>
                                        <label htmlFor="password" className="block mb-1.5 font-medium text-sm mt-3">Password</label>
                                    </div>
                                    <div className="ml-3 w-4/5">
                                        <input type="password" id="Updatepass" name="Updatepass" placeholder="password" className={`${isPassUpdateValid ? 'focus:border-sky-900' : 'focus:border-red-400 border-red-400'} emailcustom placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid border-neutral-300 focus:outline-none w-full`}
                                        onInput={(e) => validateUpdatePass((e.target as HTMLInputElement).value)}/>
                                        <p className={`text-xs ${isPassUpdateValid ? 'text-green-500' : 'text-red-500'} mt-1`}>
                                            {isPassUpdateValid ? '' : 'Password Invalid update'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-end mt-3">
                                    <div className='ml-3 w-1/5'>
                                        <label htmlFor="role" className="block mb-1.5 font-medium text-sm mt-3 ml-10">Role</label>
                                    </div>
                                    <div className="ml-3 w-4/5">
                                        <select name="role" id="role" className="py-3 px-4 rounded-md border border-solid border-neutral-300 focus:outline-none focus:border-sky-900 w-full">
                                            <option value="Developer">Developer</option>
                                            <option value="Manager">Project Manager</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="flex justify-end mt-4">
                            <button className="active:scale-95 min-w-16 form-flex justify-center items-center font-normal border py-3 px-4 gap-2 cursor-pointer rounded-md shadow-sm text-white bg-red-600 w-1/5 mt-3 mb-1 ml-3 font-semibold" 
                            onClick={updateSubmit}>Save</button>
                        </div>
                    </div>
                </div>
    </>
  );
};

export default PopupUpdate;
