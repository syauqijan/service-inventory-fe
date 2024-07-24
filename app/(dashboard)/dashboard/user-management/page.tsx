'use client';
import React, { useEffect, useState } from 'react';
import { UserTable } from '@/components/tables/user-tables/user-tables';
import { ColumnDef } from '@tanstack/react-table';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Heading } from '@/components/ui/heading';
import { Plus } from 'lucide-react';
import PopupUser from '@/components/popup/popup-user';
import DeleteUser from '@/components/modal/delete-user';
import UpdateUser from '@/components/popup/update-user';
import { CellAction } from '@/components/tables/user-tables/cell-actions';
import {toast} from 'sonner'
interface User {
  id: number;
  name: string;
  email: string;
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

  const fetchData = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT_USERS || '', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error fetching users:', errorText);
        setError('Failed to fetch users');
        return;
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('An error occurred while fetching users');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    setSelectedUser(user);
    setIsModalUpdateVisible(true);
  };

  const handleCloseUpdateModal = () => {
    setIsModalUpdateVisible(false);
    setSelectedUser(null);
  };

  const columns: ColumnDef<User, any>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'role.name',
      header: 'Role',
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: (props) => <CellAction onDelete={() => handleDeleteUser(props.row.original)} onUpdate={() => handleUpdateUser(props.row.original)} />, // Pass the correct data properties
    },
  ];
  const handleConfirmDelete = async () => {
    if (selectedUser) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_USERS}/${selectedUser.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error deleting user:', errorText);
          setError('Failed to delete user');
          return;
        }

        setData(data.filter(user => user.id !== selectedUser.id));
        handleCloseDeleteModal();
        toast.success('User deleted successfully');
        
      } catch (error) {
        console.error('Error deleting user:', error);
        setError('An error occurred while deleting user');
        toast.error('User deleted error');

      }
    }
  };


  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading title="User Management" description="Create and manage user account" />
          <button
            onClick={handleAddNewClick}
            className="w-[118px] h-10 px-4 py-2 bg-RedTint/900 rounded-md justify-center items-center inline-flex text-white text-sm font-medium"
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </button>
        </div>
        <hr className="border-neutral-200" />

        {error && <div className="text-red-500">{error}</div>}

        <UserTable
          columns={columns}
          data={data}
          searchKey="name"
          pageNo={1}
          totalUsers={data.length}
          pageCount={1}
        />
      </div>
      <PopupUser isVisible={isPopupVisible} onClose={handleClosePopup} onCreate={fetchData} />
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
