'use client';
import React, { useEffect, useState } from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Heading } from '@/components/ui/heading';
import { Plus, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { SkeletonTable } from '@/components/tables/skeleton-tables';
import { useDebounce } from '@/hooks/useDebounce'; 
import {getColumns} from '@/components/tables/service-web-tables/columns';
import { useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { WebServiceTable } from '@/components/tables/service-web-tables/service-tables';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const breadcrumbItems = [
    { title: 'Main', link: '/dashboard' },
    { title: 'Service', link: '/dashboard/service' },
];

export interface Service {
    id: string;
    name: string;
    gitlabUrl: string;
}

const Page = () => {
    const [data, setData] = useState<Service[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [totalServices, setTotalServices] = useState<number>(0);
    const searchParams = useSearchParams();
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    // const page = Number(searchParams.get('page') ?? '1');
    // const limit = Number(searchParams.get('limit') ?? '10');
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const route = useRouter();

    const handleDeleteService = (service:any) => {
        deleteSelectedServices(service.id);
        console.log('Delete service:', service.id);
    };

    const handleUpdateService = (service:any) => {
        route.push(`/dashboard/service/service-web/update-service?id=${service.id}`);
    };

    const columns = getColumns(handleDeleteService, handleUpdateService);
    
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT_SERVICES}`, {
                params: {
                    search: debouncedSearchTerm,
                    page,
                    limit
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setData(response.data.services)
            setTotalServices(response.data.total)
        } catch (error) {
            console.error('Error fetching services:', error);
            setError('An error occurred while fetching services');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [debouncedSearchTerm, page, limit]);
    
    const deleteSelectedServices = async (serviceId: string) => {
        console.log('Selected ID:', serviceId); 
        try {
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT_SERVICES}/${serviceId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
    
            if (response.status === 200) {
                toast.success('Service deleted successfully');
                fetchData();
            }
        } catch (error) {
            console.error('Error deleting service:', error);
            toast.error('An error occurred while deleting the service');
        }
    };
    

    return (
        <>
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
            <Breadcrumbs items={breadcrumbItems} />
            <div className="flex items-start justify-between">
            <Heading
                title="Service"
                description="Create and manage services"
            />
            <Link
                href={'/dashboard/service/service-web/create-service'}
                className="w-[118px] h-10 px-4 py-2 bg-RedTint/900 rounded-md justify-center items-center inline-flex text-white text-sm font-medium"
            >
                <Plus className="mr-2 h-4 w-4" /> Add New
            </Link>
            </div>
            <hr className="border-neutral-200" />

            <div className='relative flex flex-row'>
                    <Tabs defaultValue="web" className="space-y-4 w-full">
                        <TabsList>
                            <TabsTrigger value="web">Web</TabsTrigger>
                            <TabsTrigger value="api">API</TabsTrigger>
                        </TabsList>
                        <TabsContent value="web">
                            {loading ? (
                            <SkeletonTable />
                            ) : (
                            <WebServiceTable
                                columns={columns}
                                data={data}
                                searchKey="name"
                                pageNo={page}
                                totalItems={totalServices}
                                pageCount={Math.ceil(totalServices / limit)}
                                pageSizeOptions={[10, 20, 30, 40, 50]}
                            />
                            )}
                        </TabsContent>
                        <TabsContent value="api">
                            <p>API</p>
                        </TabsContent>

                    </Tabs>
                <div className='absolute w-auto right-0 flex flex-row justify-center items-center gap-6'>
                    <Input
                    placeholder="Search service"
                    value={searchTerm}
                    className="w-[260px] md:max-w-sm text-slate/900"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
        </div>
    </>
        
    
    );
}

export default Page;
