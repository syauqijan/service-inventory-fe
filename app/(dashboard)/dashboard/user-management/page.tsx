'use client';
import React, { useEffect, useState } from 'react';
import { UserTable } from '@/components/tables/user-tables/user-tables';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Heading } from '@/components/ui/heading';
import { Plus } from 'lucide-react';
import CreateUser from '@/components/popup/user-management/create-user';
import DeleteUser from '@/components/modal/delete-user';
import UpdateUser from '@/components/popup/user-management/update-user';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { SkeletonTable } from '@/components/tables/skeleton-tables';
import { useDebounce } from '@/hooks/useDebounce'; 
import { getColumns } from '@/components/tables/user-tables/columns';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string; 
  roleId: number; 
  status: string;
  role: {
    name: string;
  } | null;
}

const breadcrumbItems = [
  { title: 'Main', link: '/dashboard' },
  { title: 'User Management', link: '/dashboard/user-management' },
];

const Page = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
  const [data, setData] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [totalUsers, setTotalUsers] = useState<number>(0);

  const searchParams = useSearchParams();
  const router = useRouter();
  
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Ambil nilai page dan limit dari URL
  const page = Number(searchParams.get('page') ?? '1');
  const limit = Number(searchParams.get('limit') ?? '10');

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT_USERS}`, {
        params: {
            search: debouncedSearchTerm,
            page,
            limit
        },
        headers: {
            'Content-Type': 'application/json'
        }
    });

      if (response.status !== 200) {
        setError('Failed to fetch users');
        return;
      }

      setData(response.data.users);
      setTotalUsers(response.data.total);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('An error occurred while fetching users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [debouncedSearchTerm, page, limit]);

  const handleAddNewClick = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setIsModalDeleteVisible(true);
  };

  const handleCloseDeleteModal = () => {
    setIsModalDeleteVisible(false);
    setSelectedUser(null);
  };

  const handleUpdateUser = (user: User) => {
    setSelectedUser({
      ...user,
      password: user.password || '',
      roleId: user.roleId || 0      
    });
    setIsModalUpdateVisible(true);
  };

  const handleCloseUpdateModal = () => {
    setIsModalUpdateVisible(false);
    setSelectedUser(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedUser) {
      try {
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT_USERS}/${selectedUser.id}`,
          {
            status: 'disable',
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          setData(data.filter((user) => user.id !== selectedUser.id));
          handleCloseDeleteModal();
          toast.success('User deleted successfully');
        } else {
          setError('Failed to delete user');
          toast.error('User deletion error');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        setError('An error occurred while deleting user');
        toast.error('User deletion error');
      }
    }
  };

  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading
            title="User Management"
            description="Create and manage user account"
          />
          <button
            onClick={handleAddNewClick}
            className="w-[118px] h-10 px-4 py-2 bg-RedTint/900 rounded-md justify-center items-center inline-flex text-white text-sm font-medium"
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </button>
        </div>
        <hr className="border-neutral-200" />

        {error && <div className="text-red-500">{error}</div>}

        <Input
          placeholder="Search"
          value={searchTerm}
          className="w-full md:max-w-sm mb-4"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {loading ? (
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
            limit={limit}  // Tambahkan limit sebagai prop untuk UserTable
          />
        )}
      </div>
      <CreateUser
        isVisible={isPopupVisible}
        onClose={handleClosePopup}
        onCreate={fetchData}
      />
      <DeleteUser
        isVisible={isModalDeleteVisible}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
      <UpdateUser
        isVisible={isModalUpdateVisible}
        onClose={handleCloseUpdateModal}
        user={selectedUser}
        onUpdate={fetchData}
      />
    </>
  );
};

export default Page;
