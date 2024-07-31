'use client';
import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Heading } from '@/components/ui/heading';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';


const breadcrumbItems = [
    { title: 'Main', link: '/dashboard' },
    { title: 'Service', link: '/dashboard/service' },
    { title: 'Add New Service', link: '/dashboard/service-detail' }
  ];
 
interface Status {
    statusName: string;
  }  

  var i1 = 0;
  var i2 = 0;

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


    const [isLoading, setIsLoading] = useState<boolean>(false);
    var userIDform = user?.userId;
    const createSubmit = async () => {
        setIsLoading(true);
        const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT_SERVICE||'', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            name, gitlabUrl, description, preprodUrl, preprodUrlStatus,
            prodUrl, prodUrlStatus, userId
         }),
        });
        if (response.ok) {
        console.log('Service Created', prodUrlStatus, preprodUrlStatus);
        } else {
            console.error('Failed to create service');
        }
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        i1++;
        if(i1 / 2 == 0){
            setProdUrlStatus('inactive');
        }
        else{
            setProdUrlStatus('active');
        };
      }
    
    const handleCheckboxChange2 = () => {
        setIsChecked2(!isChecked2)
        i2++;
        if(i2 / 2 == 0){
            setPreprodUrlStatus('inactive');
        }
        else{
            setPreprodUrlStatus('active');
        };
      }

    return(
        <div className='flex max-h-screen overflow-y-auto '>
            <div className="flex-1 space-y-4  p-4 md:p-8">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="flex items-start justify-between">
                    <Heading
                        title="Add New Service Web"
                        description="Add a new service"
                    />
                </div>
                <hr className="border-neutral-200" />
                <div className='text-sm'>
                    <form>
                        <div className='w-2/5'>
                            <h3 className='font-medium mb-1'>Service Name {user?.userId}</h3>
                            <input type="text" id="Updateemail" name="Updateemail" value={name} onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Service Name" className="emailcustom placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid border-neutral-300 focus:outline-none w-4/5" required/>
                        </div>                        
                        <div className=' mt-3'>
                            <h3 className='font-medium mb-1'>Description</h3>
                            <textarea id="Updateemail" name="Updateemail" value={description} onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter Link" className="min-h-20 max-h-20 emailcustom placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid border-neutral-300 focus:outline-none w-1/2" required></textarea>
                        </div>
                        <div className='w-2/5 mt-1'>
                            <h3 className='font-medium mb-1'>Gitlab url</h3>
                            <input type="text" id="Updateemail" name="Updateemail" value={gitlabUrl} onChange={(e) => setGitlabUrl(e.target.value)}
                            placeholder="Enter Service Name" className="emailcustom placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid border-neutral-300 focus:outline-none w-4/5" required/>
                        </div>
                        <div className='mt-3 flex justify-center w-1/2'>
                            <div className='w-4/5'>
                                <h3 className='font-medium mb-1'>Pre-Prod URL</h3>
                                <input type="text" id="Updateemail" name="Updateemail" value={preprodUrl} onChange={(e) => setPreprodUrl(e.target.value)}
                                placeholder="Enter Link" className="emailcustom placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid border-neutral-300 focus:outline-none w-4/5" required/>
                            </div>
                            <div className='w-1/5'>
                                <p className='mb-2 ml-1 font-medium'>
                                    Status
                                </p>
                                <label className='autoSaverSwitch relative inline-flex cursor-pointer select-none items-center'>
                                    <input type='checkbox' name='autoSaver' className='sr-only' checked={isChecked} onChange={handleCheckboxChange} />
                                    <span className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${ isChecked ? 'bg-red-600' : 'bg-[#CCCCCE]' }`}>
                                        <span
                                            className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
                                            isChecked ? 'translate-x-6' : ''
                                            }`}>
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
                                <input type="text" id="Updateemail" name="Updateemail" placeholder="Enter Link" value={prodUrl} onChange={(e) => setProdUrl(e.target.value)}
                                className="emailcustom placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid border-neutral-300 focus:outline-none w-4/5" required/>
                            </div>
                            <div className='w-1/5'>
                                <p className='mb-2 ml-1 font-medium'>
                                    Status
                                </p>
                                <label className='autoSaverSwitch relative inline-flex cursor-pointer select-none items-center'>
                                    <input type='checkbox' name='autoSaver' className='sr-only' checked={isChecked2} onChange={handleCheckboxChange2} />
                                    <span className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${ isChecked2 ? 'bg-red-600' : 'bg-[#CCCCCE]' }`}>
                                        <span
                                            className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
                                            isChecked2 ? 'translate-x-6' : ''
                                            }`}>
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
                            <p className='active:scale-95 min-w-16 form-flex justify-center items-center font-normal border py-3 px-4 gap-2 cursor-pointer rounded-md shadow-sm text-red-600 bg-white border border-red-600 w-20 mt-3 mb-1 ml-3 font-semibold text-center' onClick={() => router.back()}>Back</p>
                            <input type="submit" value="Save" className="active:scale-95 min-w-16 form-flex justify-center items-center font-normal border py-3 px-4 gap-2 cursor-pointer rounded-md shadow-sm text-white bg-red-600 w-20 mt-3 mb-1 ml-3 font-semibold" 
                                onClick={createSubmit}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Page;
