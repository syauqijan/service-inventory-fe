'use client';
// pages/api-docs.js
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { useEffect, useState } from 'react';
import axios from 'axios';
import yaml from 'js-yaml';
import { useSearchParams } from 'next/navigation';

// Dynamic import to avoid SSR issues
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

interface Service {
  id: string;
  name: string;
  gitlabUrl: string;
  description: string;
  yamlSpec: string;
  serviceApiDetailId: string;
  sonarQubeId: string;
  unitTestingId: string;
  updatedAt: string;
  createdAt: string;
}

const swaggerSpec = {
    

  };

export default function ApiDocs() {
  // Fetching Data
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [swaggerSpec, setSwaggerSpec] = useState<object | null>(null);

  useEffect(() => {
      if (id) {
          fetchServiceData(id);
      }
  }, [id]);

  const fetchServiceData = async (serviceId: string) => {
      try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT_SERVICEAPIS}/${serviceId}`);
          setService(response.data);

          const yamlData = response.data.yamlSpec;

        // Konversi YAML menjadi objek JavaScript dengan tipe yang sesuai
        const jsonSpec: object = yaml.load(yamlData) as object;
        setSwaggerSpec(jsonSpec);
      } catch (error) {
          console.error(error);
      } finally {
          setLoading(false);
      }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!service) {
      return <div>No Yaml data found</div>;
  }
  //Akhir dari fetch data

  const breadcrumbItems = [
    { title: 'Main', link: '/dashboard' },
    { title: 'Service', link: '/dashboard/service' },
    { title: 'Service Detail', link: `/dashboard/service/service-api/view-serviceAPI?id=${service?.id}` },
    { title: 'Swagger', link: '/dashboard/service/service-api/swagger-page' }
  ];

  return (
    <div>
        <div className='px-8 pt-8'>
            <Breadcrumbs items={breadcrumbItems} />
        </div>
        <div className='px-8 mt-4'>
            <hr className="border-neutral-200" />
        </div>

        <div className='pl-3' style={{ marginTop: '-40px' }}>
          {swaggerSpec && <SwaggerUI spec={swaggerSpec} />}
        </div>
    </div>
  );
}
