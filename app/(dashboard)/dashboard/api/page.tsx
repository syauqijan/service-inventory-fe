'use client';
import React, { useEffect, useState } from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Heading } from '@/components/ui/heading';
import { Plus, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { SkeletonTable } from '@/components/tables/skeleton-tables';
import { useDebounce } from '@/hooks/useDebounce'; 
import {getColumns} from '@/components/tables/api-tables/columns';
import { useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { ApiTable } from '@/components/tables/api-tables/api-tables';

const breadcrumbItems = [
    { title: 'Main', link: '/dashboard' },
    { title: 'API', link: '/dashboard/api' },
];

export interface Service {
    id: string;
    serviceId: string;
    apiId: string;
    userId: string;
    
    service_api: {
        id: string;
        name: string
    } | null ;

    api: {
        id: string;
        method: string;
        endpoint: string;
        status: string;
        version: string;
        platform: string;
    } | null;
  }

const Page = () => {
    const [data, setData] = useState<Service[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [totalServices, setTotalServices] = useState<number>(0);
    const searchParams = useSearchParams();
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    // const page = Number(searchParams.get('page') ?? '1');
    // const limit = Number(searchParams.get('limit') ?? '10');
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);


    const handleDeleteService = (service:any) => {
        console.log('Delete service:', service);
    };

    const handleUpdateService = (service:any) => {
    console.log('Update service:', service);
    };

    const columns = getColumns(handleDeleteService, handleUpdateService, selectedIds, setSelectedIds);
    
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT_SERVICEAPIDETAILS}?search=${debouncedSearchTerm}&page=${page}&limit=${limit}`,
            {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                },
            }
            );

            if (!response.ok) {
            const errorText = await response.text();
            console.error('Error fetching services:', errorText);
            setError('Failed to fetch services');
            return;
            }

            const result = await response.json();
            setData(result.serviceApiDetail);
            setTotalServices(result.total);
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
    
    const deleteSelectedServices = async () => {
        console.log('Selected IDs:', selectedIds);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT_APIS}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ids: selectedIds }),
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error deleting api:', errorText);
                toast.error('Failed to delete api');
                return;
            }

            toast.success('Services deleted successfully');
            console.error(selectedIds);
            fetchData();
            setSelectedIds([]); // Clear selected IDs after deletion
        } catch (error) {
            console.error('Error deleting services:', error);
            toast.error('An error occurred while deleting services');
        }
    }

    return (
        <>
        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="flex items-start justify-between">
            <Heading
              title="API"
              description="Create and manage API"
            />
          </div>
          <hr className="border-neutral-200" />
  
          {error && <div className="text-red-500">{error}</div>}
        <div className='flex justify-between'>
          <div className='w-full'>
            <Input
              placeholder="Search API"
              value={searchTerm}
              className= "h-14 md:max-w-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <button className='cursor-pointer mr-9' onClick={deleteSelectedServices}>
                <Trash className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>
        <div>
            {loading ? (
                <SkeletonTable />
                ) : (
                <ApiTable
                    columns={columns}
                    data={data}
                    searchKey="name"
                    pageNo={page}
                    totalItems={totalServices}
                    pageCount={Math.ceil(totalServices / limit)}
                    pageSizeOptions={[10, 20, 30, 40, 50]}
                />
                )}
            </div>
        </div>
      </> 
    );
}

export default Page;
