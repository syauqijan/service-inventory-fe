'use client';
import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Heading } from '@/components/ui/heading';
import CombinedStatusComponent from '@/components/data-components/CombinedStatusComponent';
import CoveragePieChart from '@/components/data-components/CoveragePieChart';
import DataTableLastUpdate from '@/components/tables/dashboard/last-update-table';
import UnitTestDataTable from '@/components/tables/dashboard/UT-coverage-table';
import SonarQubeDataTable from '@/components/tables/dashboard/sonarqube-table';

const breadcrumbItems = [
  { title: 'Main', link: '/dashboard' },
  { title: 'Dashboard', link: '/dashboard/service-detail' }
];

const Dashboard = () => {
  return (
    <div>
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex items-start justify-between">
            <Heading
                title="Dashboard"
                description="Current All Service Status"
            />
        </div>
        <hr className="border-neutral-200" />

        <CombinedStatusComponent />

        <div className='flex justify-around text-sm'>
          <div className='w-1/2 pr-8'>
            <div className='border-2 rounded-md pt-6 pb-12 px-3 shadow-md h-full'>
              <CoveragePieChart />
            </div>
          </div>
          <div className='w-1/2'>
            <div className='border-2 rounded-md pt-6 pb-4 px-3 shadow-md -ml-1.5 h-full'>
              <DataTableLastUpdate />
            </div>
          </div>
        </div>

        <div className='pt-8'>
          <p className='text-xl font-semibold'>Service UT Coverage</p>
          <p className='text-md mt-1 text-gray-500'>List of services UT coverage level</p>
          <hr className="border-neutral-200 mt-4" />
          <UnitTestDataTable />
        </div>

        <div className='mt-4'>
          <p className='text-xl font-semibold'>Services Sonarqube</p>
          <p className='text-md mt-1 text-gray-500'>List of services Sonarqube</p>
          <hr className="border-neutral-200 mt-4" />
          <SonarQubeDataTable />
        </div>
      </div>
    </div>
  )
}

export default Dashboard