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
    { title: 'Service Detail', link: '/dashboard/service/service-api/view-serviceAPI' }
];

interface Service {
    version: string;
    id: string;
    name: string;
    username: string;
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
        coverageBranch: string;
        coverageFunction: string;
        coverageLines: string;
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
    user: {
        id: string;
        name: string;
    }
}

const Page = () => {
    const [progressColor, setProgressColor] = useState('');
    const [versionArray, setVersionArray] = useState<string[]>([]);

    // Fetching Data
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get('id');
    const [service, setService] = useState<Service | null>(null);
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

            const versionMain = response.data.versionService;
            const versions = versionMain.split(',');
            setVersionArray(versions);
            
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
        <div className=''>
            <div className="flex-1 space-y-4 p-4 md:p-8">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="flex items-start justify-between">
                    <Heading
                        title="Service Detail"
                        description="Service API detail"
                    />
                    <button className="flex justify-center items-center py-2 gap-2 cursor-pointer rounded-md shadow-sm text-white bg-red-600 w-24"
                        onClick={() => router.push(`/dashboard/service/service-api/update-serviceAPI?id=${service.id}`)}
                    >
                        <SquarePen className='h-5 w-5 font-medium' />
                        Edit
                    </button>
                </div>
                <hr className="border-neutral-200" />
                <div className='flex justify-center text-sm'>
                    <div className='w-4/5 pt-2'>
                        <div>
                            <h3 className='font-medium'>Service Name</h3>
                            <p className='font-normal mt-2'>{service.name}</p>
                        </div>
                        <div className='mt-6'>
                            <h3 className='font-medium'>Description</h3>
                            <p className='font-normal mt-2'>{service.description}</p>
                        </div>
                        <div className='mt-6'>
                            <h3 className='font-medium mb-2'>Gitlab URL</h3>
                            <Link href={`${service.gitlabUrl}`} className='underline cursor-pointer font-normal flex w-fit text-blue-600'>
                                {service.gitlabUrl}
                                <ArrowUpRight fontSize="1.5em" />
                            </Link>
                        </div>
                        <div className='mt-6'>
                            <h3 className='font-medium mb-2'>Swagger API</h3>
                            <a onClick={(e) => {
                                e.preventDefault();
                                window.open(`/dashboard/service/service-api/swagger-page?id=${service.id}`, '_blank');
                            }} className='font-normal flex items-center text-blue-600 cursor-pointer w-1/6'>
                                <p className='underline mr-1'>
                                    View in new page
                                </p>
                                <ArrowUpRight fontSize="1.5em" />
                            </a>
                        </div>
                    </div>
                    <div className='w-1/5 pt-2'>
                        <div className='mt-4'>
                            <h3 className='font-medium'>Updated at</h3>
                            <p className='font-normal mt-2'>{new Date(service.updatedAt).toLocaleString()}</p>
                        </div>
                        <div className='mt-4'>
                            <h3 className='font-medium'>Created at</h3>
                            <p className='font-normal mt-2'>{new Date(service.createdAt).toLocaleString()}</p>
                        </div>
                        <div className='mt-4'>
                            <h3 className='font-medium'>Created by</h3>
                            <p className='font-normal mt-2'>{service.user.name}</p>
                        </div>
                        <div className='mt-4'>
                            <h3 className='font-medium'>Version</h3>
                            <div className="flex flex-wrap">
                                {versionArray.map((version, index) => (
                                    <p key={index} className='font-normal mt-2 flex-1 min-w-[50%]'>{version}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex justify-start'>
                    <div className='border-r-2 w-2/5 pr-8'>
                        <h1 className='text-xl font-semibold mt-3 pl-2'>
                            SonarQube
                        </h1>
                        <div className='grid grid-cols-3 gap-2 content-center mt-3'>
                            <div className='border mx-1 mb-3 px-4 pb-3 pt-4 rounded-md shadow'>
                                <h1 className='text-center'>Quality Gate</h1>
                                <p className='text-center text-2xl mt-2 font-semibold'>{service.sonarqube.qualityGateStatus}</p>
                            </div>
                            <div className='border mx-1 mb-3 px-4 pb-3 pt-4 rounded-md shadow'>
                                <h1 className='text-center'>Bugs</h1>
                                <p className='text-center text-2xl mt-2 font-semibold'>{service.sonarqube.bugs}</p>
                            </div>
                            <div className='border mx-1 mb-3 px-4 pb-3 pt-4 rounded-md shadow'>
                                <h1 className='text-center'>Vunerabilities</h1>
                                <p className='text-center text-2xl mt-2 font-semibold'>{service.sonarqube.vulnerabilities}</p>
                            </div>
                            <div className='border mx-1 px-4 pb-3 pt-4 rounded-md shadow'>
                                <h1 className='text-center'>Code Smells</h1>
                                <p className='text-center text-2xl mt-2 font-semibold'>{service.sonarqube.codesmell}</p>
                            </div>
                            <div className='border mx-1 px-4 pb-3 pt-4 rounded-md shadow'>
                                <h1 className='text-center'>Coverage</h1>
                                <p className='text-center text-2xl mt-2 font-semibold'>{service.sonarqube.coverage}</p>
                            </div>
                            <div className='border mx-1 px-4 pb-3 pt-4 rounded-md shadow'>
                                <h1 className='text-center'>Duplications</h1>
                                <p className='text-center text-2xl mt-2 font-semibold'>{service.sonarqube.duplication}</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-3/5 pl-8'>
                        <h1 className='text-xl font-semibold mt-3 pl-2'>
                            Unit Testing
                        </h1>
                        <div className='grid grid-cols-3 gap-2 content-center mt-3'>
                            <div className='border mx-2 mb-3 px-3 pt-3 pb-1 rounded-md shadow'>
                                <h1 className='text-center'>Coverage Statement</h1>
                                <p className='text-center text-2xl mt-2 font-semibold'>{service.unit_testing.coverageStatement}%</p>
                                <div className={`h-2.5 rounded-full w-full ${progressColor}`}></div>
                            </div>
                            <div className='border mx-2 mb-3 p-3 rounded-md shadow'>
                                <h1 className='text-center'>Coverage Branch</h1>
                                <p className='text-center text-2xl mt-3 font-semibold'>{service.unit_testing.coverageBranch}%</p>
                            </div>
                            <div className='border mx-2 mb-3 p-3 rounded-md shadow'>
                                <h1 className='text-center'>Coverage Lines</h1>
                                <p className='text-center text-2xl mt-3 font-semibold'>{service.unit_testing.coverageLines}%</p>
                            </div>
                            <div className='border mx-2 p-3 rounded-md shadow'>
                                <h1 className='text-center'>Coverage Function</h1>
                                <p className='text-center text-2xl mt-3 font-semibold'>{service.unit_testing.coverageFunction}%</p>
                            </div>
                            <div className='border mx-2 p-3 rounded-md shadow'>
                                <h1 className='text-center'>Test Case Success</h1>
                                <p className='text-center text-2xl mt-3 font-semibold'>{service.unit_testing.testCasePassed}%</p>
                            </div>
                            <div className='border mx-2 p-3 rounded-md shadow'>
                                <h1 className='text-center'>Test Case Failed</h1>
                                <p className='text-center text-2xl mt-3 font-semibold'>{service.unit_testing.testCaseFailed}%</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className='text-2xl font-semibold mt-16'>APIs</h1>
                    <p className='pt-2 text-sm font-normal text-slate-500'>API connected to this service</p>
                </div>
                <ServiceAPIPage serviceApiId={service.id} />
            </div>
        </div>
    );
}

export default Page;
