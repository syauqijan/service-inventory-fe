import React from 'react';
import { UserTable } from '@/components/tables/user-tables/user-tables';
import { ColumnDef } from '@tanstack/react-table';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Heading } from '@/components/ui/heading';
import { Plus } from 'lucide-react';
import Link from 'next/link';

interface User {
  name: string;
  email: string;
  role: string;
//   avatar?: string;
}

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
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
   
  },
];

const data: User[] = [
  { name: 'Is Mail', email: 'imail@mail.com', role: 'Admin' },
  { name: 'Is Mail', email: 'imail@mail.com', role: 'Developer' },
  { name: 'Is Mail', email: 'imail@mail.com', role: 'Project Manager' },
  { name: 'Is Mail', email: 'imail@mail.com', role: 'Admin' },
  { name: 'Is Mail', email: 'imail@mail.com', role: 'Admin' },
  { name: 'Is Mail', email: 'imail@mail.com', role: 'Admin' },
  { name: 'Is Mail', email: 'imail@mail.com', role: 'Developer' },
  { name: 'Is Mail', email: 'imail@mail.com', role: 'Project Manager' },
  { name: 'Is Mail', email: 'imail@mail.com', role: 'Admin' },
  { name: 'Is Mail', email: 'imail@mail.com', role: 'Admin' },
  { name: 'Is Mail', email: 'imail@mail.com', role: 'Admin' },
  { name: 'Is Mail', email: 'imail@mail.com', role: 'Developer' },
  { name: 'Is Mail', email: 'imail@mail.com', role: 'Project Manager' },
  { name: 'Is Mail', email: 'imail@mail.com', role: 'Admin' },
  { name: 'Is Mail', email: 'imail@mail.com', role: 'Admin' },
];
const breadcrumbItems = [
    { title: 'Main', link: '/dashboard' },
    { title: 'User Management', link: '/dashboard/user-management' }
  ];
  
const page = () => {
return (
<>
    <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading
            title="User Management"
            description="Create and manage user account"
          />

          <Link
            href={'/dashboard/user/new'}
            className='w-[118px] h-10 px-4 py-2 bg-slate-900 rounded-md justify-center items-center inline-flex text-white text-sm font-medium'
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <hr className="border-neutral-200" />

        <UserTable
            columns={columns}
            data={data}
            searchKey="name"
            pageNo={1}
            totalUsers={data.length}
            pageCount={1}
        />
    </div>
</>



  );
};

export default page;
