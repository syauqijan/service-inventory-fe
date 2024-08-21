'use client';
import React, { useEffect, useState } from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Heading } from '@/components/ui/heading';
import ServiceAPIPage from '@/components/tables/api-tables/page'

const breadcrumbItems = [
    { title: 'Main', link: '/dashboard' },
    { title: 'API', link: '/dashboard/api' },
];
const Page = () => {
    return (
        <>
            <div className="flex-1 space-y-4 p-4 md:p-8">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="flex items-start justify-between">
                    <Heading
                    title="API"
                    description="Create and manage API"
                    />
                </div>
                <hr className="border-neutral-200" />
                <div>
                    <ServiceAPIPage />
                </div>
            </div>
        </> 
    );
}

export default Page;
