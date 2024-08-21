'use client';
import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Heading } from '@/components/ui/heading';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { toast } from 'sonner';
import axios from 'axios';

const breadcrumbItems = [
    { title: 'Main', link: '/dashboard' },
    { title: 'Service', link: '/dashboard/service' },
    { title: 'Add New Service', link: '/dashboard/service/service-web/create-service' }
];

interface Status {
    statusName: string;
}  

interface ValidationErrors {
    name?: string;
    gitlabUrl?: string;
    description?: string;
    preprodUrl?: string;
    prodUrl?: string;
}

const Page = () => {
    const { user } = useAuth();
    const router = useRouter();
    const [isChecked, setIsChecked] = useState(false)
    const [isChecked2, setIsChecked2] = useState(false)
    const userId = user?.userId;
    const [gitlabUrl, setGitlabUrl] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [preprodUrl, setPreprodUrl] = useState<string>('');
    const [preprodUrlStatus, setPreprodUrlStatus] = useState<string>('inactive');
    const [prodUrl, setProdUrl] = useState<string>('');
    const [prodUrlStatus, setProdUrlStatus] = useState<string>('inactive');
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const validateForm = () => {
        let err: ValidationErrors = {};
        let isValid = true;
        if (!name) {
            err.name = 'Service name must be filled';
            isValid = false;
        }
        if (!gitlabUrl) {
            err.gitlabUrl = 'URL must be filled';
            isValid = false;
        }
        if (!description) {
            err.description = 'Description must be filled';
            isValid = false;
        }
        if (!preprodUrl) {
            err.preprodUrl = 'URL must be filled';
            isValid = false;
        }
        if (!prodUrl) {
            err.prodUrl = 'URL must be filledd';
            isValid = false;
        }
        setErrors(err);
        return isValid;
    }
    const createSubmit = async (event:any) => {
        event.preventDefault();
        const formIsValid = await validateForm();
        if (formIsValid) {
            setIsLoading(true);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT_SERVICES}`, {
                userId,
                name,
                description,
                gitlabUrl,
                preprodUrl,
                preprodUrlStatus,
                prodUrl,
                prodUrlStatus
            });
            if(response.status===201){
                router.push('/dashboard/service');
                toast.success('Service created successfully')
            }
        } catch (error) {
            console.error('Failed to create service', error);

            if (axios.isAxiosError(error) && error.response) {
                setErrors(error.response.data.errors || {});
            } else {
                toast.error('An error occurred while creating service');
            }
        } finally {
            setIsLoading(false);
        }
        }
        
    };
    

    const handleCheckboxPreProd = () => {
        setIsChecked(prevState => {
            const newState = !prevState;
            setProdUrlStatus(newState ? 'active' : 'inactive');
            return newState;
        });
    }
    
    const handleCheckboxProd = () => {
        setIsChecked2(prevState => {
            const newState = !prevState;
            setPreprodUrlStatus(newState ? 'active' : 'inactive');
            return newState;
        });
    }
    

    return (
        <div className='flex overflow-y-auto '>
            <div className="flex-1 space-y-4 p-4 md:p-8">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="flex items-start justify-between">
                    <Heading
                        title="Add New Service Web"
                        description="Add a new service"
                    />
                </div>
                <hr className="border-neutral-200" />
                <div className='text-sm'>
                    <form onSubmit={createSubmit}>
                        <div className='w-2/5'>
                            <h3 className='font-medium mb-1'>Service Name</h3>
                            <input type="text" id="serviceName" name="serviceName" value={name} onChange={(e) => setName(e.target.value)}
                                placeholder="Enter Service Name" className="placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid border-neutral-300 focus:outline-none w-4/5" />
                            {errors.name && <p className="text-red-500  text-sm font-normal pt-1 pl-1">{errors.name}</p>}
                        </div>
                        <div className=' mt-3'>
                            <h3 className='font-medium mb-1'>Description</h3>
                            <textarea id="serviceDesc" name="serviceDesc" value={description} onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter description" className="min-h-20 max-h-20 emailcustom placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid border-neutral-300 focus:outline-none w-1/2" ></textarea>
                            {errors.description && <p className="text-red-500  text-sm font-normal pt-1 pl-1">{errors.description}</p>}
                        </div>
                        <div className='w-2/5 mt-3'>
                            <h3 className='font-medium mb-1'>Gitlab url</h3>
                            <input type="text" id="gitlabUrl" name="gitlabUrl" value={gitlabUrl} onChange={(e) => setGitlabUrl(e.target.value)}
                                placeholder="Enter link" className="placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid border-neutral-300 focus:outline-none w-4/5"  />
                            {errors.gitlabUrl && <p className="text-red-500 text-sm font-normal pt-1 pl-1">{errors.gitlabUrl}</p>}
                        </div>
                        <div className='mt-3 flex justify-center w-1/2'>
                            <div className='w-4/5'>
                                <h3 className='font-medium mb-1'>Pre-Prod URL</h3>
                                <input type="text" id="preprodUrl" name="preprodUrl" value={preprodUrl} onChange={(e) => setPreprodUrl(e.target.value)}
                                    placeholder="Enter link" className="placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid border-neutral-300 focus:outline-none w-4/5"  />
                                {errors.preprodUrl && <p className="text-red-500 text-sm font-normal pt-1 pl-1">{errors.preprodUrl}</p>}
                            </div>
                            <div className='w-1/5'>
                                <p className='mb-2 ml-1 font-medium'>
                                    Status
                                </p>
                                <label className='autoSaverSwitch relative inline-flex cursor-pointer select-none items-center'>
                                    <input type='checkbox' name='autoSaver' className='sr-only' checked={isChecked} onChange={handleCheckboxPreProd} />
                                    <span className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${isChecked ? 'bg-slate/900' : 'bg-[#CCCCCE]'}`}>
                                        <span
                                            className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${isChecked ? 'translate-x-6' : ''}`}>
                                        </span>
                                    </span>
                                    <span className='label flex items-center text-sm font-medium text-black'>
                                        <span className='pl-1'>
                                            <input type='text' id='preprodUrlStatus' value={isChecked ? 'Active' : 'Inactive'} onChange={(e) => setPreprodUrlStatus(e.target.value)}>
                                            </input>
                                        </span>
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className='mt-3 flex justify-center w-1/2'>
                            <div className='w-4/5'>
                                <h3 className='font-medium mb-1'>Production URL</h3>
                                <input type="text" id="prodUrl" name="prodUrl" placeholder="Enter link" value={prodUrl} onChange={(e) => setProdUrl(e.target.value)}
                                    className="emailcustom placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid border-neutral-300 focus:outline-none w-4/5"  />
                                {errors.prodUrl && <p className="text-red-500 text-sm font-normal pt-1 pl-1">{errors.prodUrl}</p>}
                            </div>
                            <div className='w-1/5'>
                                <p className='mb-2 ml-1 font-medium'>
                                    Status
                                </p>
                                <label className='autoSaverSwitch relative inline-flex cursor-pointer select-none items-center'>
                                    <input type='checkbox' name='autoSaver' className='sr-only' checked={isChecked2} onChange={handleCheckboxProd} />
                                    <span className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${isChecked2 ? 'bg-slate/900' : 'bg-[#CCCCCE]'}`}>
                                        <span
                                            className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${isChecked2 ? 'translate-x-6' : ''}`}>
                                        </span>
                                    </span>
                                    <span className='label flex items-center text-sm font-medium text-black'>
                                        <span className='pl-1'>
                                            <input type='text' id='prodUrlStatus' value={isChecked2 ? 'Active' : 'Inactive'} onChange={(e) => setProdUrlStatus(e.target.value)}>
                                            </input>
                                        </span>
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className='mt-8 flex justify-between pr-16'>
                            <p className='active:scale-95 min-w-16 form-flex justify-center items-center py-3 px-4 gap-2 cursor-pointer rounded-md shadow-sm text-red-600 bg-white border border-red-600 w-20 mt-3 mb-1 ml-3 font-semibold text-center' onClick={() => router.back()}>Cancel</p>
                            <input type="submit" value="Save" disabled={isLoading} className="active:scale-95 min-w-16 form-flex justify-center items-center border py-3 px-4 gap-2 cursor-pointer rounded-md shadow-sm text-white bg-red-600 w-20 mt-3 mb-1 ml-3 font-semibold"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
        
}
export default Page;