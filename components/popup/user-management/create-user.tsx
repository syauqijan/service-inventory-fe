import React, { useState, useEffect } from 'react';
import {toast} from "sonner";
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

interface PopupUserProps {
    isVisible: boolean;
    onClose: () => void;
    onCreate: () => void; 
}

interface ValidationErrors {
    name?: string;
    email?: string;
    password?: string;
}

interface Role {
    id: number;
    name: string;
  }

const CreateUser: React.FC<PopupUserProps> = ({ isVisible, onClose, onCreate }) => {
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [roleId, setRoleId] = useState<number>(1);
    const [roles, setRoles] = useState<Role[]>([]);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const fetchRoles = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT_ROLES}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        if (response.status !== 200) {
            console.error('Failed to fetch roles');
            return;
        }

        setRoles(response.data);
        } catch (error) {
        console.error('Error fetching roles:', error);
        }
    };

    useEffect(() => {
        fetchRoles();
        }, []);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[\w-\.]+@phincon\.com$/;
        return emailRegex.test(email);
    };

    const validateName = (name: string): boolean => {
        const nameRegex = /^.{1,30}$/;
        return nameRegex.test(name);
    };

    const validatePassword = (password: string): boolean => {
        const passwordRegex = /^.{8,}$/;
        return passwordRegex.test(password);
    };

    const validateForm = (): boolean => {
        let err: ValidationErrors = {};
        let isValid = true;

        if (!validateEmail(email)) {
        err.email = 'Email is invalid';
        isValid = false;
        }

        if (!validateName(name)) {
        err.name = 'Name is invalid';
        isValid = false;
        }

        if (!validatePassword(password)) {
        err.password = 'Password is invalid';
        isValid = false;
        }

        setErrors(err);
        return isValid;
    };

    const emptyForm = () => {
        setEmail('');
        setName('');
        setPassword('');
        setErrors({});
    }
    const createSubmit = async () => {
        const formIsValid = await validateForm();
        if (formIsValid) {
            setIsLoading(true);
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT_USERS}`, {
                    email,
                    name,
                    password,
                    roleId
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 201) {
                console.log('User created');
                emptyForm();
                onClose();
                onCreate();
                toast.success('New user created successfully');
                } else {
                    toast.error('New user created error');
                    console.error('Failed to create user');
                }
            } catch (error) {
                toast.error('New user created error');
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

return (
    <>
    {isVisible && (
        <div
        className="bg-black/25 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 translate-middle w-screen h-screen z-40"
        onClick={onClose}
        ></div>
    )}
    <div
        className={`min-w-72 text-gray-800 text-sm font-normal flex flex-col gap-5 box-border shadow-sm rounded-xl z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 translate-middle bg-white pb-5 pl-7 pr-5 w-fit ${
        isVisible ? 'block' : 'hidden'
        }`}
    >
        <div className="mr-2">
        <div className="font-semibold text-left mt-7 text-xl flex justify-between">
            Create New User
            <button className="mb-2 mr-2" onClick={onClose}>
            X
            </button>
        </div>
        <div className="mb-3">
            <p className="text-slate-400 mt-2 text-base">
            Register new account with specified role to access.
            </p>
        </div>
        <form className="flex flex-col">
            <div className="flex flex-col gap-0.5 justify-end">
            <div className="flex justify-end mt-3">
                <div className="ml-3 w-1/5">
                <label
                    htmlFor="createname"
                    className="block mb-1.5 font-medium text-sm mt-3 text-right"
                >
                    Name
                </label>
                </div>
                <div className="ml-3 w-4/5">
                <input
                    type="text"
                    id="createname"
                    name="createname"
                    placeholder="Name"
                    className={`${
                    errors.name
                        ? 'focus:border-red-400 border-red-400'
                        : 'focus:border-sky-900'
                    } emailcustom placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid border-neutral-300 focus:outline-none w-full`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.name && (
                    <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                )}
                </div>
            </div>
            <div className="flex justify-end mt-3">
                <div className="ml-3 w-1/5">
                <label
                    htmlFor="Createemail"
                    className="block mb-1.5 font-medium text-sm mt-3 text-right"
                >
                    Email
                </label>
                </div>
                <div className="ml-3 w-4/5">
                <input
                    type="text"
                    id="Createemail"
                    name="Createemail"
                    placeholder="Email"
                    className={`${
                    errors.email
                        ? 'focus:border-red-400 border-red-400'
                        : 'focus:border-sky-900'
                    } emailcustom placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid border-neutral-300 focus:outline-none w-full`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
                </div>
            </div>
            <div className="flex justify-end mt-3">
                <div className="ml-3 w-1/5">
                <label
                    htmlFor="Createpass"
                    className="block mb-1.5 font-medium text-sm mt-3 text-right"
                >
                    Password
                </label>
                </div>
                <div className="ml-3 w-4/5">
                <input
                    type="password"
                    id="Createpass"
                    name="Createpass"
                    placeholder="Password"
                    className={`${
                    errors.password
                        ? 'focus:border-red-400 border-red-400'
                        : 'focus:border-sky-900'
                    } emailcustom placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid border-neutral-300 focus:outline-none w-full`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                    <p className="text-xs text-red-500 mt-1">
                    {errors.password}
                    </p>
                )}
                </div>
            </div>
            <div className="flex justify-end mt-3">
                <div className="ml-3 w-1/5">
                <label
                    htmlFor="role"
                    className="block mb-1.5 font-medium text-sm mt-3 text-right"
                >
                    Role
                </label>
                </div>
                <div className="ml-3 w-4/5">
                    <select
                        name="role"
                        id="role"
                        className="py-3 px-4 rounded-md border border-solid border-neutral-300 focus:outline-none focus:border-sky-900 w-full"
                        value={roleId}
                        onChange={(e) => setRoleId(Number(e.target.value))}
                    >
                        {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                            {role.name}
                        </option>
                        ))}
                    </select>
                </div>
            </div>
            </div>
        </form>
        <div className="flex justify-end mt-4">
            <button
            className="active:scale-95 min-w-[22px] form-flex justify-center items-center text-center border py-3 px-2 gap-2 cursor-pointer rounded-md shadow-sm text-white bg-red-600 w-1/5 mt-3 mb-1  font-semibold"
            onClick={createSubmit}
            disabled={isLoading}
            >
            {isLoading ? 'Loading...' : 'Save'}
            </button>
        </div>
        </div>
    </div>
    </>
);
};

export default CreateUser;
