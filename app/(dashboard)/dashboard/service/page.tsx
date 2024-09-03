'use client';
import React, { useEffect, useState } from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Heading } from '@/components/ui/heading';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { SkeletonTable } from '@/components/tables/skeleton-tables';
import { useDebounce } from '@/hooks/useDebounce'; 
import { getColumns } from '@/components/tables/service-web-tables/columns';
import { getColumnsApi } from '@/components/tables/service-api-tables/columns';
import { useSearchParams, useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { WebServiceTable } from '@/components/tables/service-web-tables/service-tables';
import { ApiServiceTable } from '@/components/tables/service-api-tables/service-api-tables';
import axios from 'axios';
import { AlertModal } from '@/components/modal/alert-modal';
import { AlertModalApi } from '@/components/modal/alert-api-modal';
import useAuth from '@/hooks/useAuth';

const breadcrumbItems = [
    { title: 'Main', link: '/dashboard' },
    { title: 'Service', link: '/dashboard/service' },
];

export interface Service {
    id: string;
    name: string;
    gitlabUrl: string;
}

export interface ServiceApi {
    id: string;
    name: string;
    gitlabUrl: string;
    sonarQubeId: string;
    unitTestingId: string;
}

const Page = () => {
    const { user } = useAuth();
    const [data, setData] = useState<Service[]>([]);
    const [dataApi, setDataApi] = useState<ServiceApi[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [totalServices, setTotalServices] = useState<number>(0);
    const [totalServiceApi, setTotalServiceApi] = useState<number>(0);
    const searchParams = useSearchParams();
    const router = useRouter();

    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const page = Number(searchParams.get('page') ?? '1');
    const limit = Number(searchParams.get('limit') ?? '10');

    const [open, setOpen] = useState(false);
    const [openApi, setOpenApi] = useState(false);
    const [serviceId, setServiceId] = useState<string | null>(null);

    const [sonarqubeId, setSonarqubeID] = useState<string | null>(null);
    const [unitTestingId, setUnitTestingID] = useState<string | null>(null);

    const handleDeleteService = async (service: any) => {
        setServiceId(service.id);
        setOpen(true);
    };

    const handleDeleteServiceApi = async (serviceApi: any) => {
        setServiceId(serviceApi.id);
        setSonarqubeID(serviceApi.sonarQubeId);
        setUnitTestingID(serviceApi.unitTestingId);
        setOpenApi(true);
    };

    const handleUpdateService = (service: any) => {
        router.push(`/dashboard/service/service-web/update-service?id=${service.id}`);
    };

    const handleUpdateServiceApi = (service: any) => {
        router.push(`/dashboard/service/service-api/update-serviceAPI?id=${service.id}`);
    };

    const columns = getColumns(handleDeleteService, handleUpdateService);
    const columnsApi = getColumnsApi(handleDeleteServiceApi, handleUpdateServiceApi);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT_SERVICES}`, {
                params: {
                    search: debouncedSearchTerm,
                    page,
                    limit,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const userRoleID = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT_USERS}/${user?.userId}`);
            const userRole = response.data;

            setData(response.data.services);
            setTotalServices(response.data.total);
        } catch (error) {
            console.error('Error fetching services:', error);
            setError('An error occurred while fetching services');
        } finally {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT_SERVICEAPIS}`, {
                    params: {
                        search: debouncedSearchTerm,
                        page,
                        limit,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                setDataApi(response.data.serviceapi);
                setTotalServiceApi(response.data.total);
            } catch (error) {
                console.error('Error fetching service APIs:', error);
                setError('An error occurred while fetching service APIs');
            } finally {
                setLoading(false);
            }
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

    const deleteSelectedServiceApi = async (unitTestingId: string, sonarqubeId: string) => {
        console.log('Selected Unit Testing ID:', unitTestingId);
        console.log('Selected Sonarqube ID:', sonarqubeId);
        try {
            const response = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT_UNITTESTING}/${unitTestingId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            const response2 = await axios.delete(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT_SONARQUBE}/${sonarqubeId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200 && response2.status === 200) {
                toast.success('Api service deleted successfully');
                fetchData();
            }
        } catch (error) {
            console.error('Error deleting service:', error);
            toast.error('An error occurred while deleting the Api service');
        }
    };

    const onConfirm = () => {
        if (serviceId) {
            deleteSelectedServices(serviceId);
            setServiceId(null);
        }
        setOpen(false);
    };

    const onConfirmApi = () => {
        if (serviceId) {
            deleteSelectedServiceApi(unitTestingId || '', sonarqubeId || '');
            setUnitTestingID(null);
            setSonarqubeID(null);
        }
        setOpenApi(false);
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onConfirm}
                loading={loading}
            />
            <AlertModalApi
                isOpenApi={openApi}
                onCloseApi={() => setOpenApi(false)}
                onConfirmApi={onConfirmApi}
                loading={loading}
            />
            <Tabs defaultValue="web" className="flex-1 space-y-4 p-4 pt-6 md:p-8">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="flex items-start justify-between">
                    <Heading title="Service" description="Create and manage services" />
                    <div>
                        <TabsContent value="web">
                            <Link href={'/dashboard/service/service-web/create-service'}
                                className="h-10 px-4 py-2 bg-RedTint/900 rounded-md justify-center items-center inline-flex text-white text-sm font-medium">
                                <Plus className="mr-2 h-4 w-4" /> Add New {user?.userId}
                            </Link>
                        </TabsContent>
                        <TabsContent value="api">
                            <Link href={'/dashboard/service/service-api/create-serviceAPI'}
                                className="ml-4 h-10 px-4 py-2 bg-RedTint/900 rounded-md justify-center items-center inline-flex text-white text-sm font-medium">
                                <Plus className="mr-2 h-4 w-4" /> Add New
                            </Link>
                        </TabsContent>
                    </div>
                </div>
                <hr className="border-neutral-200" />

                <div className="relative flex flex-row">
                    <div className="space-y-4 w-full">
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
                            {loading ? (
                                <SkeletonTable />
                            ) : (
                                <ApiServiceTable
                                    columns={columnsApi}
                                    data={dataApi}
                                    searchKey="name"
                                    pageNo={page}
                                    totalItems={totalServiceApi}
                                    pageCount={Math.ceil(totalServiceApi / limit)}
                                    pageSizeOptions={[10, 20, 30, 40, 50]}
                                />
                            )}
                        </TabsContent>
                    </div>
                    <div className="absolute w-auto right-0 flex flex-row justify-center items-center gap-6">
                        <Input
                            placeholder="Search service"
                            value={searchTerm}
                            className="w-[260px] md:max-w-sm text-slate/900"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </Tabs>
        </>
    );
};

export default Page;
