import React, { useEffect, useState } from 'react';
import { CircleCheck , CircleX  } from 'lucide-react';
import axios from 'axios';

interface ServiceData {
    name: string;
    status: string;
    updatedAt: string;
}

const CombinedStatusComponent: React.FC = () => {
    const [services, setServices] = useState<ServiceData[]>([]);
    const [serviceApis, setServiceApis] = useState<ServiceData[]>([]);
    const [activeCount, setActiveCount] = useState(0);
    const [inactiveCount, setInactiveCount] = useState(0);
    const [numberTotal, setNumberTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Menentukan nilai default untuk page dan limit
    const page = 1; // Nilai default untuk halaman pertama
    const limit = 10000; // Nilai default untuk mengambil semua data, sesuaikan dengan kebutuhan Anda

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true);

                const servicesUrl = process.env.NEXT_PUBLIC_API_ENDPOINT_SERVICES || '';
                const serviceApisUrl = process.env.NEXT_PUBLIC_API_ENDPOINT_SERVICEAPIS || '';

                console.log('Fetching data from:', servicesUrl, serviceApisUrl);

                const [servicesResponse, serviceApisResponse] = await Promise.all([
                    axios.get(servicesUrl, { params: { page, limit }}),  // Gunakan nilai default untuk page dan limit
                    axios.get(serviceApisUrl, { params: { page, limit }}) // Gunakan nilai default untuk page dan limit
                ]);

                console.log('Services Response:', servicesResponse);
                console.log('Service APIs Response:', serviceApisResponse);

                const servicesData = servicesResponse.data.services || [];
                const serviceApisData = serviceApisResponse.data.serviceapi || [];

                setServices(servicesData);
                setServiceApis(serviceApisData);

                // Gabungkan data dari kedua API
                const combinedData = [...servicesData, ...serviceApisData];

                // Hitung status active dan inactive
                const activeCount = combinedData.filter(item => item.status === 'active').length;
                const inactiveCount = combinedData.filter(item => item.status === 'inactive').length;
                const numberTotal = combinedData.length;

                setActiveCount(activeCount);
                setInactiveCount(inactiveCount);
                setNumberTotal(numberTotal);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Axios error:', error.response?.data);
                } else {
                    console.error('Unexpected error:', error);
                }
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []); // Hanya dijalankan sekali saat komponen dimount

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='flex justify-around pb-2 pr-4 text-sm'>
            <div className='w-1/2 pr-6'>
                <div className='border-2 rounded-md p-6'>
                    <div className='flex justify-between items-start'>
                        <h1 className='text-base font-semibold'>Active Service</h1>
                        <CircleCheck />
                    </div>
                    <p className='text-4xl font-semibold mt-3'>{activeCount}</p>
                    <p className='mt-2 mb-2'>From {numberTotal} services</p>
                </div>
            </div>
            <div className='w-1/2 pr-6'>
                <div className='border-2 rounded-md p-6'>
                    <div className='flex justify-between items-start'>
                        <h1 className='text-base font-semibold'>Inctive Service</h1>
                        <CircleX />
                    </div>
                    <p className='text-4xl font-semibold mt-3'>{inactiveCount}</p>
                    <p className='mt-2 mb-2'>From {numberTotal} services</p>
                </div>
            </div>
        </div>
    );
};

export default CombinedStatusComponent;
