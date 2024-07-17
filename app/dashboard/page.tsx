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
    };

    const hideDeleteButtonClick = () => {
        setShowDeleteDiv(false);
      };
    
    const showUpdateButtonClick = () => {
        setShowUpdateDiv(true);
    };

    const hideUpdateButtonClick = () => {
        setShowUpdateDiv(false);
    };

    const showCreateButtonClick = () => {
        setShowCreateDiv(true);
    };

    const hideCreateButtonClick = () => {
        setShowCreateDiv(false);
    };

    const showSureButtonClick = () => {
        setShowSureDiv(true);
    };

    const hideSureButtonClick = () => {
        setShowSureDiv(false);
    };

    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);

    const validateEmail = (email: string): void => {
      const emailRegex = /^[\w-\.]+@phincon\.com$/;
      setIsEmailValid(emailRegex.test(email));
    };

    return(
        <div className="h-screen bg-zinc-100 text-black">
            <h1>Click the Text</h1><br></br>
            <button onClick={showDeleteButtonClick}>Show delete div</button> <br></br>
            <button onClick={showUpdateButtonClick}>Show update div</button> <br></br>
            <button onClick={showCreateButtonClick}>Show Create div</button> <br></br>
            <button onClick={showSureButtonClick}>Show Sure div</button> <br></br>

            {/* Delete div */}
            <div className="min-w-72 form-container rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 translate-middle bg-white pb-5 pl-10 pr-10 w-2/5" style={{display: showDeleteDiv ? 'block' : 'none'}}>
                <div className="logo-container mt-7 text-xl mt-3">
                Are you sure to delete this user account?
                </div>
                <div className="mb-3">
                    <p className="text-slate-400 mt-2 text-base">
                    This action cannot be undone. This will permanently delete the account and remove the data from our servers.
                    </p>
                </div>
                <div className="flex justify-end">
                    <button className="form-submit-btn text-black bg-white w-20 mt-3 mb-3 font-semibold" onClick={hideDeleteButtonClick}>Cancel</button>
                    <button className="form-submit-btn text-white bg-black w-16 m-3 font-semibold" onClick={hideDeleteButtonClick}>Yes</button>
                </div>
            </div>

            {/* Sure div */}
            <div className="min-w-72 form-container rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 translate-middle bg-white pb-5 pl-10 pr-10 w-2/5" style={{display: showSureDiv ? 'block' : 'none'}}>
                <div className="logo-container mt-7 text-xl mt-3">
                Are you sure absolutely sure?
                </div>
                <div className="mb-3">
                    <p className="text-slate-400 mt-2 text-base">
                    This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                    </p>
                </div>
                <div className="flex justify-end">
                    <button className="form-submit-btn text-black bg-white w-20 mt-3 mb-3 font-semibold" onClick={hideSureButtonClick}>Cancel</button>
                    <button className="form-submit-btn text-white bg-black w-24 m-3 font-semibold" onClick={hideSureButtonClick}>Continue</button>
                </div>
            </div>

            {/* Update div */}
            <div className="min-w-72 form-container rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 translate-middle bg-white pb-5 pl-7 pr-5 w-1/3" style={{display: showUpdateDiv ? 'block' : 'none'}}>
                <div className="mr-2">
                    <div className="logo-container mt-7 text-xl mt-3">
                    Update user account
                    </div>
                    <div className="mb-3">
                        <p className="text-slate-400 mt-2 text-sm">
                        Update account info with specified role to access.
                        </p>
                    </div>
                    <form className="form">
                        <div className="form-group flex justify-end">
                            <div className="flex justify-center">
                                <label htmlFor="email" className="emailtext mt-3 ml-7">Name</label>
                                <input type="text" id="email" name="email" placeholder="Name" className="w-3/4 ml-5"/>
                            </div>
                            <div className="flex justify-center mt-3">
                                <label htmlFor="email" className="emailtext mt-3 ml-8">email</label>
                                <input type="text" id="email" name="email" placeholder="email" className="w-3/4 ml-5"/>
                            </div>
                            <div className="flex justify-center mt-3">
                                <label htmlFor="password" className="emailtext mt-3">Password</label>
                                <input type="password" id="password" name="password" placeholder="password" className="w-3/4 ml-5"/>
                            </div>
                            <div className="flex justify-center mt-3">
                                <label htmlFor="role" className="emailtext mt-3 ml-10">Role</label>
                                <select name="role" id="role" className="w-3/4 ml-5 border">
                                    <option value="Developer">Developer</option>
                                    <option value="Manager">Project Manager</option>
                                </select>
                            </div>
                        </div>
                    </form>

                    <div className="flex justify-end mt-4">
                        <button className="min-w-16 form-submit-btn text-white bg-black w-1/5 mt-3 mb-1 ml-3 font-semibold" onClick={hideUpdateButtonClick}>Save</button>
                    </div>
                </div>
            </div>

            {/* Update div */}
            <div className="min-w-72 form-container rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 translate-middle bg-white pb-5 pl-7 pr-5 w-1/3" style={{display: showCreateDiv ? 'block' : 'none'}}>
                <div className="mr-2">
                    <div className="logo-container mt-7 text-xl mt-3">
                    Create New User
                    </div>
                    <div className="mb-3">
                        <p className="text-slate-400 mt-2 text-sm">
                        Register new account with specified role to access.
                        </p>
                    </div>
                    <form className="form">
                        <div className="form-group flex justify-end">
                            <div className="flex justify-center">
                                <label htmlFor="email" className="emailtext mt-3 ml-7">Name</label>
                                <input type="text" id="email" name="email" placeholder="Name" className="w-3/4 ml-5"/>
                            </div>
                            <div className="flex justify-center mt-3">
                                <label htmlFor="email" className="emailtext mt-3 ml-8">email</label>
                                <input type="text" id="email" name="email" placeholder="email" className="w-3/4 ml-5"
                                onInput={(e) => validateEmail((e.target as HTMLInputElement).value)}
                                />
                            </div>
                            <p className={`text-sm mt-2 ${isEmailValid ? 'text-green-500' : 'text-red-500'}`}>
                                {isEmailValid ? 'Email Valid' : 'Email tidak Valid'}
                            </p>
                            <div className="flex justify-center mt-3">
                                <label htmlFor="password" className="emailtext mt-3">Password</label>
                                <input type="password" id="password" name="password" placeholder="password" className="w-3/4 ml-5"/>
                            </div>
                            <div className="flex justify-center mt-3">
                                <label htmlFor="role" className="emailtext mt-3 ml-10">Role</label>
                                <select name="role" id="role" className="w-3/4 ml-5 border">
                                    <option value="Developer">Developer</option>
                                    <option value="Manager">Project Manager</option>
                                </select>
                            </div>
                        </div>
                    </form>
                    <div className="flex justify-end mt-4">
                        <button className="min-w-16 form-submit-btn text-white bg-black w-1/5 mt-3 mb-1 ml-3 font-semibold" onClick={hideCreateButtonClick}>Save</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dashboard;