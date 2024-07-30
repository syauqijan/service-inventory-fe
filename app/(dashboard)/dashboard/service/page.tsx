'use client';
import React, { useEffect, useState } from 'react';
import { UserTable } from '@/components/tables/user-tables/user-tables';
import { ColumnDef } from '@tanstack/react-table';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Heading } from '@/components/ui/heading';
import { Plus, Trash } from 'lucide-react';
import PopupUser from '@/components/popup/popup-user';
import DeleteUser from '@/components/modal/delete-user';
import UpdateUser from '@/components/popup/update-user';
import { CellAction } from '@/components/tables/user-tables/cell-actions';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { SkeletonTable } from '@/components/tables/skeleton-tables';
import { useDebounce } from '@/hooks/useDebounce'; 
import {getColumns} from '@/components/tables/service-web-tables/columns';
import { useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { WebServiceTable } from '@/components/tables/service-web-tables/service-tables';

const breadcrumbItems = [
    { title: 'Main', link: '/dashboard' },
    { title: 'Service', link: '/dashboard/service' },
];

export interface Service {
    id: string;
    name: string;
    gitlabURL: string;
  }

const Page = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
    const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [totalUsers, setTotalUsers] = useState<number>(0);
    const searchParams = useSearchParams();
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    // const page = Number(searchParams.get('page') ?? '1');
    // const limit = Number(searchParams.get('limit') ?? '10');
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);

    const handleAddNewClick = () => {
        setIsPopupVisible(true);
    };
    const handleDeleteService = (service:any) => {
        // Implement delete logic
        console.log('Delete service:', service);
      };
    
      const handleUpdateService = (service:any) => {
        // Implement update logic
        console.log('Update service:', service);
      };
    
      const columns = getColumns(handleDeleteService, handleUpdateService);
    
    const webServicesDummyData: Service[] = [
        { id: '1', name: 'service-browse-family-plan', gitlabURL: 'https://github.com/Kiranism/next-shadcn-dashboard-starter...' },
        { id: '2', name: 'service-user-management', gitlabURL: 'https://github.com/Kiranism/user-management-service...' },
        { id: '3', name: 'service-billing', gitlabURL: 'https://github.com/Kiranism/billing-service...' },
        { id: '4', name: 'service-authentication', gitlabURL: 'https://github.com/Kiranism/auth-service...' },
        { id: '5', name: 'service-notifications', gitlabURL: 'https://github.com/Kiranism/notification-service...' },
      ];
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
                href={'/dashboard/service/service-web'}
                className="w-[118px] h-10 px-4 py-2 bg-RedTint/900 rounded-md justify-center items-center inline-flex text-white text-sm font-medium"
            >
                <Plus className="mr-2 h-4 w-4" /> Add New
            </Link>
            </div>
            <hr className="border-neutral-200" />

            {error && <div className="text-red-500">{error}</div>}
            <div className='relative flex flex-row'>
                {/* <div className='flex justify-center items-center'> */}
                    <Tabs defaultValue="web" className="space-y-4 w-full">
                        <TabsList>
                            <TabsTrigger value="web">Web</TabsTrigger>
                            <TabsTrigger value="api">API</TabsTrigger>
                        </TabsList>
                        <TabsContent value="web">
                            <WebServiceTable
                                columns={columns}
                                data={webServicesDummyData}
                                searchKey="name"
                                pageNo={1}
                                totalItems={webServicesDummyData.length}
                                pageCount={1}
                                pageSizeOptions={[10, 20, 30, 40, 50]}
                            />
                        </TabsContent>
                        <TabsContent value="api">
                            <p>API</p>
                        </TabsContent>

                    </Tabs>
                {/* </div> */}
                <div className='absolute right-0 flex flex-row justify-center items-center gap-6'>
                    <button className='cursor-pointer'>
                        <Trash className="w-6 h-6 text-gray-500 " />
                    </button>
                    <Input
                    placeholder="Search service"
                    value={searchTerm}
                    className="w-[250px] md:max-w-sm"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* {loading ? (
            <SkeletonTable />
            ) : (
            <UserTable
                columns={getColumns(handleDeleteUser, handleUpdateUser)}
                data={data}
                searchKey="name"
                pageNo={page}
                totalUsers={totalUsers}
                pageCount={Math.ceil(totalUsers / limit)}
                pageSizeOptions={[10, 20, 30, 40, 50]}
            />
            )} */}
        </div>
        {/* <DeleteUser
            isVisible={isModalDeleteVisible}
            onClose={handleCloseDeleteModal}
            onConfirm={handleConfirmDelete}
        />
        <UpdateUser
            isVisible={isModalUpdateVisible}
            onClose={handleCloseUpdateModal}
            user={selectedUser}
            onUpdate={fetchData}
        /> */}
    </>
        
    
    );
}

export default Page;
