// 'use client';
// import React, { useState } from 'react';
// import { Breadcrumbs } from '@/components/breadcrumbs';
// import { Heading } from '@/components/ui/heading';
// import { ArrowUpRight, SquarePen  } from 'lucide-react';
// import { UserTable } from '@/components/tables/service-detail-tables/service-details-tables';
// import { ColumnDef } from '@tanstack/react-table';

// interface User {
//     name: string;
//     url: string;
//     status: string;
//   }
  
//   const columns: ColumnDef<User, any>[] = [
//     {
//       accessorKey: 'name',
//       header: 'Name',
//     },
//     {
//       accessorKey: 'url',
//       header: 'URL',
//     },
//     {
//       accessorKey: 'status',
//       header: 'Status',
//     },
//   ];
  
//   const data: User[] = [
//     { name: 'Pre-Prod URL', url: 'https://github.com/Kiranism/next-shadcn-dashboard-starter', status: 'Inactive' },
//     { name: 'Production URL', url: 'https://github.com/Kiranism/next-shadcn-dashboard-starter', status: 'Active' },
//   ];


// const breadcrumbItems = [
//     { title: 'Main', link: '/dashboard' },
//     { title: 'Service', link: '/dashboard/service' },
//     { title: 'Service Detail', link: '/dashboard/service-detail' }
//   ];

// const page = () => {
//     return(
//         <div>
//             <div className="flex-1 space-y-4  p-4 md:p-8">
//                     <Breadcrumbs items={breadcrumbItems} />
//                     <div className="flex items-start justify-between">
//                         <Heading
//                             title="Service Detail"
//                             description="Service web detail"
//                         />
//                             <button className="flex justify-center items-center py-2 gap-2 cursor-pointer rounded-md shadow-sm text-white bg-red-600 w-24">
//                                 <SquarePen className='h-5 w-5 font-medium'/>
//                                 Edit
//                             </button>
//                     </div>
//                     <hr className="border-neutral-200" />
//                     <div className='flex justify-center text-sm'>
//                         <div className='w-4/5 pt-2 pr-80'>
//                             <div>
//                                 <h3 className='font-medium'>Service Name</h3>
//                                 <p className='font-normal'>Service-browse-family-plan</p>
//                             </div>
//                             <div className='mt-6'>
//                                 <h3 className='font-medium'>Description</h3>
//                                 <p className='font-normal mt-2'>Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident.</p>
//                             </div>
//                             <div className='mt-6'>
//                                 <h3 className='font-medium mb-2'>Gitlab URL</h3>
//                                 <a className='font-normal flex items-center text-blue-600' href='https://github.com/Kiranism/next-shadcn-dashboard-starter'>
//                                     <p className='underline mr-1'>
//                                         https://github.com/Kiranism/next-shadcn-dashboard-starter
//                                     </p>
//                                     <ArrowUpRight fontSize="1.5em"/>
//                                 </a>
//                             </div>
//                         </div>
//                         <div className='w-1/5 pt-2'>
//                             <div>
//                                 <h3 className='font-medium'>Created At</h3>
//                                 <p className='font-normal'>2/10/2022 | 13:45:01</p>
//                             </div>
//                             <div className='mt-4'>
//                                 <h3 className='font-medium'>Updated at</h3>
//                                 <p className='font-normal mt-1'>4/12/2023 | 11:14:31</p>
//                             </div>
//                             <div className='mt-4'>
//                                 <h3 className='font-medium'>Updated by</h3>
//                                 <p className='font-normal mt-1'>Hastho</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div>
//                         <h1 className='text-2xl font-semibold mt-16'>URLs</h1>
//                         <p className='font-normal'>URL related to this service</p>
//                     </div>
//                     <div className='w-full flex justify-center text-sm'>
//                         <UserTable
//                             columns={columns}
//                             data={data}
//                         />
//                     </div>
//                 </div>
//         </div>
//     )
// }
// export default page;