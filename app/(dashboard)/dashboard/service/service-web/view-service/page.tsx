'use client';
import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Heading } from '@/components/ui/heading';
import { ArrowUpRight, SquarePen, Copy } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ServiceDetailTable } from '@/components/tables/service-web-detail-tables/service-detail-tables';
import { ColumnDef } from '@tanstack/react-table';
import {columns} from '@/components/tables/service-web-detail-tables/columns';
import { toast } from 'sonner';
import { URL } from '@/components/tables/service-web-detail-tables/columns';
import axios from 'axios';

interface Service {
    id: string;
    name: string;
    gitlabUrl: string;
    description: string;
    preprodUrl: string;
    preprodUrlStatus: string;
    prodUrl: string;
    prodUrlStatus: string;
    createdAt: string;
    updatedAt: string;
    version: string;
    userId: string;
    status: string;
    createdBy: string;
    user: {
        name: string;
    };
    creator: {
        name: string;
    }
}


const breadcrumbItems = [
    { title: 'Main', link: '/dashboard' },
    { title: 'Service', link: '/dashboard/service' },
    { title: 'Service Detail', link: '/dashboard/service-detail' }
];

const Page = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get('id');
    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);

    const [versionArray, setVersionArray] = useState<string[]>([]);

    useEffect(() => {
        if (id) {
            fetchServiceData(id);
        }
    }, [id]);

    const fetchServiceData = async (serviceId: string) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT_SERVICES}/${serviceId}`);
            setService(response.data);
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

    const data: URL[] = [
        { name: 'Pre-Prod URL', url: service.preprodUrl, status: service.preprodUrlStatus },
        { name: 'Production URL', url: service.prodUrl, status: service.prodUrlStatus },
    ];

    return (
        <div>
            <div className="flex-1 space-y-4 p-4 md:p-8">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="flex items-start justify-between">
                    <Heading
                        title="Service Detail"
                        description="Service web detail"
                    />
                    <button className="flex justify-center items-center py-2 gap-2 cursor-pointer rounded-md shadow-sm text-white bg-red-600 w-24"
                            onClick={() => router.push(`/dashboard/service/service-web/update-service?id=${service.id}`)}
                    >
                        <SquarePen className='h-5 w-5 font-medium' />
                        Edit
                    </button>
                </div>
                <hr className="border-neutral-200" />
                <div className='flex justify-center text-sm'>
                    <div className='w-4/5 pt-2 pr-80'>
                        <div>
                            <h3 className='font-medium'>Service Name</h3>
                            <p className='font-normal mt-1'>{service.name}</p>
                        </div>
                        <div className='mt-6'>
                            <h3 className='font-medium'>Description</h3>
                            <p className='font-normal mt-1'>{service.description}</p>
                        </div>
                        <div className='mt-6'>
                            <h3 className='font-medium mb-1'>Gitlab URL</h3>
                            <a className='font-normal flex items-center text-blue-600' href={service.gitlabUrl}>
                                <p className='underline mr-1'>
                                    {service.gitlabUrl}
                                </p>
                                <ArrowUpRight fontSize="1.5em" />
                            </a>
                        </div>
                        <div className='mt-3'>
                            <h3 className='font-medium'>Status</h3>
                            <p className='font-normal mt-1'>{service.status}</p>
                        </div>
                    </div>
                    <div className='w-1/5 pt-2'>
                        <div>
                            <h3 className='font-medium'>Created At</h3>
                            <p className='font-normal mt-1'>{new Date(service.createdAt).toLocaleString()}</p>
                        </div>
                        <div className='mt-4'>
                            <h3 className='font-medium'>Updated at</h3>
                            <p className='font-normal mt-1'>{new Date(service.updatedAt).toLocaleString()}</p>
                        </div>
                        <div className='mt-4'>
                            <h3 className='font-medium'>Updated by</h3>
                            <p className='font-normal mt-1'>{service.user.name}</p>
                        </div>
                        <div className='mt-4'>
                            <h3 className='font-medium'>Created by</h3>
                            <p className='font-normal mt-1'>{service.creator.name}</p>
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

                <div>
                    <h1 className='text-2xl font-semibold mt-14'>URLs</h1>
                    <p className='pt-2 text-sm font-normal text-slate-500'>URL related to this service</p>
                </div>
                <div className='w-full h-[150px] flex justify-center text-sm'>
                    <ServiceDetailTable
                        columns={columns}
                        data={data}
                    />
                </div>
            </div>
        </div>
    );
}

export default Page;
