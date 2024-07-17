'use client';
import Link from 'next/link';
import { useState } from 'react';

const Dashboard = () => {
    const [showDeleteDiv, setShowDeleteDiv] = useState(false);
    const [showUpdateDiv, setShowUpdateDiv] = useState(false);
    const [showCreateDiv, setShowCreateDiv] = useState(false);
    const [showSureDiv, setShowSureDiv] = useState(false);

    const showDeleteButtonClick = () => {
      setShowDeleteDiv(true);
      setShowSureDiv(false);
      setShowCreateDiv(false);
      setShowUpdateDiv(false);
    };

    const hideDeleteButtonClick = () => {
        setShowDeleteDiv(false);
      };
    
    const showUpdateButtonClick = () => {
        setShowUpdateDiv(true);
        setShowSureDiv(false);
        setShowDeleteDiv(false);
        setShowCreateDiv(false);
    };

    const hideUpdateButtonClick = () => {
        setShowUpdateDiv(false);
    };

    const showCreateButtonClick = () => {
        setShowCreateDiv(true);
        setShowSureDiv(false);
        setShowDeleteDiv(false);
        setShowUpdateDiv(false);
    };

    const hideCreateButtonClick = () => {
        setShowCreateDiv(false);
    };

    const showSureButtonClick = () => {
        setShowSureDiv(true);
        setShowDeleteDiv(false);
        setShowCreateDiv(false);
        setShowUpdateDiv(false);
    };

    const hideSureButtonClick = () => {
        setShowSureDiv(false);
    };

    const [isEmailCreateValid, setIsEmailCreateValid] = useState<boolean>(true);
    const [isEmailUpdateValid, setIsEmailUpdateValid] = useState<boolean>(true);

    const validateCreateEmail = (Createemail: string): void => {
      const emailCreateRegex = /^[\w-\.]+@phincon\.com$/;
      setIsEmailCreateValid(emailCreateRegex.test(Createemail));
    };

    const validateUpdateEmail = (Updateemail: string): void => {
        const emailUpdateRegex = /^[\w-\.]+@phincon\.com$/;
        setIsEmailUpdateValid(emailUpdateRegex.test(Updateemail));
      };

    return(
        <div className="h-screen bg-zinc-100 text-black">
            <h1>Click the Text</h1><br></br>
            <button onClick={showDeleteButtonClick}>Show delete div</button> <br></br>
            <button onClick={showUpdateButtonClick}>Show update div</button> <br></br>
            <button onClick={showCreateButtonClick}>Show Create div</button> <br></br>
            <button onClick={showSureButtonClick}>Show Sure div</button> <br></br>

            {/* Delete div */}
            <div className="min-w-72 bg-white text-gray-800 text-sm font-normal flex flex-col gap-5 box-border shadow-sm rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 translate-middle bg-white pb-5 pl-10 pr-10 w-2/5" style={{display: showDeleteDiv ? 'block' : 'none'}}>
                <div className="font-semibold text-left mt-7 text-xl mt-3">
                Are you sure to delete this user account?
                </div>
                <div className="mb-3">
                    <p className="text-slate-400 mt-2 text-base">
                    This action cannot be undone. This will permanently delete the account and remove the data from our servers.
                    </p>
                </div>
                <div className="flex justify-end">
                    <button className="active:scale-95 form-flex justify-center items-center font-normal border py-3 px-4 gap-2 cursor-pointer rounded-md shadow-sm text-black bg-white w-20 mt-3 mb-3 font-semibold" onClick={hideDeleteButtonClick}>Cancel</button>
                    <button className="active:scale-95 form-flex justify-center items-center font-normal border py-3 px-4 gap-2 cursor-pointer rounded-md shadow-sm text-white bg-black w-16 m-3 font-semibold" onClick={hideDeleteButtonClick}>Yes</button>
                </div>
            </div>

            {/* Sure div */}
            <div className="min-w-72 bg-white text-gray-800 text-sm font-normal flex flex-col gap-5 box-border shadow-sm rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 translate-middle bg-white pb-5 pl-10 pr-10 w-2/5" style={{display: showSureDiv ? 'block' : 'none'}}>
                <div className="font-semibold text-left mt-7 text-xl mt-3">
                Are you sure absolutely sure?
                </div>
                <div className="mb-3">
                    <p className="text-slate-400 mt-2 text-base">
                    This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                    </p>
                </div>
                <div className="flex justify-end">
                    <button className="active:scale-95 form-flex justify-center items-center font-normal border py-3 px-4 gap-2 cursor-pointer rounded-md shadow-sm text-black bg-white w-20 mt-3 mb-3 font-semibold" onClick={hideSureButtonClick}>Cancel</button>
                    <button className="active:scale-95 form-flex justify-center items-center font-normal border py-3 px-4 gap-2 cursor-pointer rounded-md shadow-sm text-white bg-black w-24 m-3 font-semibold" onClick={hideSureButtonClick}>Continue</button>
                </div>
            </div>

            {/* Update div */}
            <div className="min-w-72 bg-white text-gray-800 text-sm font-normal flex flex-col gap-5 box-border shadow-sm rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 translate-middle bg-white pb-5 pl-7 pr-5 w-fit" style={{display: showUpdateDiv ? 'block' : 'none'}}>
                <div className="mr-2">
                    <div className="font-semibold text-left mt-7 text-xl mt-3">
                    Update user account
                    </div>
                    <div className="mb-3 mr-3">
                        <p className="text-slate-400 mt-2 text-base">
                        Update account info with specified role to access.
                        </p>
                    </div>
                    <form className="flex flex-col">
                        <div className="flex flex-col gap-0.5 justify-end">
                            <div className="flex justify-end mt-3">
                                <label htmlFor="email" className="block mb-1.5 font-medium text-sm mt-3 ml-7">Name</label>
                                <input type="text" id="email" name="email" placeholder="Name" className="placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid border-neutral-300 focus:outline-none focus:border-sky-900 w-2/3 ml-5"/>
                            </div>
                            <div className="flex justify-end mt-3">
                                <label htmlFor="email" className="block mb-1.5 font-medium text-sm mt-3 ml-8">email</label>
                                <input type="text" id="Updateemail" name="Updateemail" placeholder="email" className={`${isEmailUpdateValid ? 'focus:border-emerald-500' : 'focus:border-red-400 border-red-400'} emailcustom placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid border-neutral-300 focus:outline-none w-2/3 ml-5`}
                                onInput={(e) => validateUpdateEmail((e.target as HTMLInputElement).value)}
                                />
                            </div>

                            <div className="flex justify-end mt-3">
                                <label htmlFor="password" className="block mb-1.5 font-medium text-sm mt-3">Password</label>
                                <input type="password" id="password" name="password" placeholder="password" className="placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid border-neutral-300 focus:outline-none focus:border-sky-900 w-2/3 ml-5"/>
                            </div>
                            <div className="flex justify-end mt-3">
                                <label htmlFor="role" className="block mb-1.5 font-medium text-sm mt-3 ml-10">Role</label>
                                <select name="role" id="role" className="py-3 px-4 rounded-md border border-solid border-neutral-300 focus:outline-none focus:border-sky-900 w-2/3 ml-5">
                                    <option value="Developer">Developer</option>
                                    <option value="Manager">Project Manager</option>
                                </select>
                            </div>
                        </div>
                    </form>

                    <div className="flex justify-end mt-4">
                        <button className="active:scale-95 min-w-16 form-flex justify-center items-center font-normal border py-3 px-4 gap-2 cursor-pointer rounded-md shadow-sm text-white bg-black w-1/5 mt-3 mb-1 ml-3 font-semibold" onClick={hideUpdateButtonClick}>Save</button>
                    </div>
                </div>
            </div>

            {/* Update div */}
            <div className="min-w-72 bg-white text-gray-800 text-sm font-normal flex flex-col gap-5 box-border shadow-sm rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 translate-middle bg-white pb-5 pl-7 pr-5 w-fit" style={{display: showCreateDiv ? 'block' : 'none'}}>
                <div className="mr-2">
                    <div className="font-semibold text-left mt-7 text-xl mt-3">
                    Create New User
                    </div>
                    <div className="mb-3">
                        <p className="text-slate-400 mt-2 text-base">
                        Register new account with specified role to access.
                        </p>
                    </div>
                    <form className="flex flex-col">
                        <div className="flex flex-col gap-0.5 justify-end">
                            <div className="flex justify-end mt-3">
                                <label htmlFor="email" className="block mb-1.5 font-medium text-sm mt-3 ml-7">Name</label>
                                <input type="text" id="email" name="email" placeholder="Name" className="placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid border-neutral-300 focus:outline-none focus:border-sky-900 w-2/3 ml-5"/>
                            </div>
                            <div className="flex justify-end mt-3">
                                <label htmlFor="email" className="block mb-1.5 font-medium text-sm mt-3 ml-8">email</label>
                                <input type="text" id="Createemail" name="Createemail" placeholder="email" className={`${isEmailCreateValid ? 'focus:border-emerald-500' : 'focus:border-red-400 border-red-400'} emailcustom placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid border-neutral-300 focus:outline-none w-2/3 ml-5`}
                                onInput={(e) => validateCreateEmail((e.target as HTMLInputElement).value)}
                                />
                            </div>

                            <div className="flex justify-end mt-3">
                                <label htmlFor="password" className="block mb-1.5 font-medium text-sm mt-3">Password</label>
                                <input type="password" id="password" name="password" placeholder="password" className="placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid border-neutral-300 focus:outline-none focus:border-sky-900 w-2/3 ml-5"/>
                            </div>
                            <div className="flex justify-end mt-3">
                                <label htmlFor="role" className="block mb-1.5 font-medium text-sm mt-3 ml-10">Role</label>
                                <select name="role" id="role" className="py-3 px-4 rounded-md border border-solid border-neutral-300 focus:outline-none focus:border-sky-900 w-2/3 ml-5">
                                    <option value="Developer">Developer</option>
                                    <option value="Manager">Project Manager</option>
                                </select>
                            </div>
                        </div>
                    </form>
                    <div className="flex justify-end mt-4">
                        <button className="active:scale-95 min-w-16 form-flex justify-center items-center font-normal border py-3 px-4 gap-2 cursor-pointer rounded-md shadow-sm text-white bg-black w-1/5 mt-3 mb-1 ml-3 font-semibold" onClick={hideCreateButtonClick}>Save</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dashboard;