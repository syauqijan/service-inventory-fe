'use client';
import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Heading } from '@/components/ui/heading';
import { ArrowUpRight, SquarePen, Copy } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import ServiceAPIPage from '@/components/tables/service-api-detail-tables/page';

const breadcrumbItems = [
    { title: 'Main', link: '/dashboard' },
    { title: 'Service', link: '/dashboard/service' },
    { title: 'Service API update', link: '/dashboard/service/service-api/update-serviceAPI' }
];

interface Service {
    id: string;
    name: string;
    gitlabUrl: string;
    description: string;
    yamlSpec: string;
    serviceApiDetailId: string;
    sonarCubeId: string;
    unitTestingId: string;
    updatedAt: string;
    createdAt: string;
    unit_testing: {
        id: string;
        testCasePassed: string;
        testCaseFailed: string;
        coverageStatement: number;
        CoverageBranch: string;
        coverageFunction: string;
        CoverageLines: string;
    };
    sonarqube: {
        id: string;
        qualityGateStatus: string;
        bugs: string;
        vulnerabilities: string;
        codesmell: string;
        coverage: string;
        duplication: string;
    }
}

const Page = () => {
    const [progressColor, setProgressColor] = useState('');

    // Fetching Data
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get('id');
    const [service, setService] = useState<Service | null>(null);
    const [api, setApi] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchServiceData(id);
        }
    }, [id]);

    const fetchServiceData = async (serviceId: string) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT_SERVICEAPIS}/${serviceId}`);
            setService(response.data);

            const cover = response.data.unit_testing.coverageStatement;
            if (cover > 80) {
                setProgressColor('bg-green-500');
            } else if (cover >= 70) {
                setProgressColor('bg-yellow-400');
            } else {
                setProgressColor('bg-red-500');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    if (!service) {
        return <div>No service data found</div>;
    }
    // Akhir Fetching Data

    return (
        <div className='flex overflow-y-auto'>
            <div className="flex-1 space-y-4 p-4 md:p-8">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="flex items-start justify-between">
                    <Heading
                        title="Add New Service API"
                        description="Add a new service API"
                    />
                </div>
                <hr className="border-neutral-200" />
                <div className='text-sm'>
                    <form>
                    <div className='w-1/2 border'>
                            <h3 className='font-medium mb-1'>Service Name</h3>
                            <input 
                                type="text" 
                                name='service_name' 
                                placeholder="Enter Service Name" 
                                value={service.name}
                                className={`emailcustom placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid w-2/3`} 
                            />
                        </div>
                        <div className='mt-3'>
                            <h3 className='font-medium mb-1'>Description</h3>
                            <textarea 
                                name='description' 
                                placeholder="Enter description" 
                                value={service.description}
                                className={`min-h-20 max-h-20 emailcustom placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid w-1/2`} 
                            ></textarea>
                        </div>
                        <div className='w-1/2 mt-3'>
                            <h3 className='font-medium mb-1'>Gitlab url</h3>
                            <input 
                                type="text" 
                                name='gitlabURL' 
                                placeholder="Enter link" 
                                value={service.gitlabUrl}
                                className={`emailcustom placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid w-2/3`} 
                            />
                        </div>
                        <div className='w-1/2 mt-3'>
                            <h3 className='font-medium mb-1'>Yaml Spec</h3>
                            <textarea
                                value={service.yamlSpec}
                                name='yamlValue'
                                placeholder="Your YAML code will appear here after saving"
                                className="min-h-20 max-h-40 emailcustom placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid border-neutral-300 focus:outline-none w-2/3"
                            />
                        </div>

                        <div className='mt-10'>
                            <h1 className='text-xl font-semibold mt-3'>
                                Sonarqube
                            </h1>
                            <p className='pt-1 text-sm font-normal text-slate-500'>Sonarqube detail</p>
                            <div className='flex justify-start mt-3'>
                                <div className='w-1/3'>
                                    <div>
                                        <h3 className='font-medium mb-1'>Quality Gate Status</h3>
                                        <input 
                                            type="text" 
                                            name='qualityGateStatus' 
                                            placeholder="Enter Status" 
                                            value={service.sonarqube.qualityGateStatus}
                                            className={`placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid w-full`} 
                                        />
                                    </div>
                                    <div className='mt-4'>
                                        <h3 className='font-medium mb-1'>Vulnerabilities</h3>
                                        <input 
                                            type="text" 
                                            name='vulnerabilities' 
                                            placeholder="Enter Data" 
                                            value={service.sonarqube.vulnerabilities}
                                            className={`placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid w-full`} 
                                        />
                                    </div>
                                    <div className='mt-4'>
                                        <h3 className='font-medium mb-1'>Coverage</h3>
                                        <input 
                                            type="text" 
                                            name='coverage' 
                                            placeholder="Enter Data" 
                                            value={service.sonarqube.coverage}
                                            className={`placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid w-full`} 
                                        />
                                    </div>
                                </div>
                                <div className='w-1/3 ml-14'>
                                    <div>
                                        <h3 className='font-medium mb-1'>Bugs</h3>
                                        <input 
                                            type="text" 
                                            name='bugs' 
                                            placeholder="Enter Data" 
                                            value={service.sonarqube.bugs}
                                            className={`placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid w-full`} 
                                        />
                                    </div>
                                    <div className='mt-4'>
                                        <h3 className='font-medium mb-1'>Codesmell</h3>
                                        <input 
                                            type="text" 
                                            name='codesmell' 
                                            placeholder="Enter Data" 
                                            value={service.sonarqube.codesmell}
                                            className={`placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid w-full`} 
                                        />
                                    </div>
                                    <div className='mt-4'>
                                        <h3 className='font-medium mb-1'>Duplication</h3>
                                        <input 
                                            type="text" 
                                            name='duplication' 
                                            placeholder="Enter Data" 
                                            value={service.sonarqube.duplication}
                                            className={`placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid w-full`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='mt-7'>
                            <h1 className='text-xl font-semibold mt-3'>
                                Unit Testing
                            </h1>
                            <p className='pt-1 text-sm font-normal text-slate-500'>Unit testing detail</p>
                            <div className='flex justify-start mt-3'>
                                <div className='w-1/3'>
                                    <div>
                                        <h3 className='font-medium mb-1'>Coverage Statement</h3>
                                        <input 
                                            type="number" 
                                            name='coverageStatement' 
                                            placeholder="Enter Data" 
                                            value={service.unit_testing.coverageStatement}
                                            className={`placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid w-full`} 
                                        />
                                    </div>
                                    <div className='mt-4'>
                                        <h3 className='font-medium mb-1'>Coverage Function</h3>
                                        <input 
                                            type="number" 
                                            name='coverageFunction' 
                                            placeholder="Enter Data" 
                                            value={service.unit_testing.coverageFunction}
                                            className={`placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid w-full`} 
                                        />
                                    </div>
                                    <div className='mt-4'>
                                        <h3 className='font-medium mb-1'>Test Case Passed</h3>
                                        <input 
                                            type="number" 
                                            name='testCasePassed' 
                                            placeholder="Enter Data" 
                                            value={service.unit_testing.testCasePassed}
                                            className={`placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid w-full`} 
                                        />
                                    </div>
                                </div>
                                <div className='w-1/3 ml-14'>
                                    <div>
                                        <h3 className='font-medium mb-1'>Coverage Branch</h3>
                                        <input 
                                            type="number" 
                                            name='coverageBranch' 
                                            placeholder="Enter Data" 
                                            value={service.unit_testing.CoverageBranch}
                                            className={`placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid w-full`} 
                                        />
                                    </div>
                                    <div className='mt-4'>
                                        <h3 className='font-medium mb-1'>Coverage Lines</h3>
                                        <input 
                                            type="number" 
                                            name='coverageLines' 
                                            placeholder="Enter Data" 
                                            value={service.unit_testing.CoverageLines}
                                            className={`placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid w-full`} 
                                        />
                                    </div>
                                    <div className='mt-4'>
                                        <h3 className='font-medium mb-1'>Test Case Failed</h3>
                                        <input 
                                            type="number" 
                                            name='testCaseFailed' 
                                            placeholder="Enter Data" 
                                            value={service.unit_testing.testCaseFailed}
                                            className={`placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid w-full`} 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-20 flex justify-between pr-16'>
                            <p className='active:scale-95 min-w-16 form-flex justify-center items-center py-3 px-4 gap-2 cursor-pointer rounded-md shadow-sm text-red-600 bg-white border border-red-600 w-20 mt-3 mb-1 ml-3 font-semibold text-center' onClick={() => router.back()}>Cancel</p>
                            <input type="submit" value="Save" className="active:scale-95 min-w-16 form-flex justify-center items-center border py-3 px-4 gap-2 cursor-pointer rounded-md shadow-sm text-white bg-red-600 w-20 mt-3 mb-1 ml-3 font-semibold"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Page;