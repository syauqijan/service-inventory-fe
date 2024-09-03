import React, { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import axios from 'axios';

interface CombinedData {
    name: string;
    status: string;
    updatedAt: string;
}

const DataTableLastUpdate: React.FC = () => {
    const [data, setData] = useState<CombinedData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch data from both endpoints
                const servicesResponse = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT_SERVICES || '');
                const serviceApisResponse = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT_SERVICEAPIS || '');

                // Transform data
                const servicesData = servicesResponse.data.services.map((item: any) => ({
                    name: item.name,
                    status: item.status,
                    updatedAt: item.updatedAt, // Assuming this is in ISO 8601 format or similar
                }));

                const serviceApisData = serviceApisResponse.data.serviceapi.map((item: any) => ({
                    name: item.name,
                    status: item.status,
                    updatedAt: item.updatedAt, // Assuming this is in ISO 8601 format or similar
                }));

                // Combine data
                const combinedData = [...servicesData, ...serviceApisData];

                // Sort data based on proximity to the current time
                const currentTime = new Date().getTime();
                combinedData.sort((a, b) => Math.abs(currentTime - new Date(a.updatedAt).getTime()) - Math.abs(currentTime - new Date(b.updatedAt).getTime()));

                // Get the latest 8 records closest to current time
                const latestData = combinedData.slice(0, 8);

                setData(latestData);
                setLoading(false);
            } catch (error) {
                if (error instanceof Error) {
                    console.error('Error fetching data:', error.message);
                    setError('Failed to fetch data: ' + error.message);
                } else {
                    console.error('Error fetching data:', error);
                    setError('Failed to fetch data');
                }
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        const timeOptions: Intl.DateTimeFormatOptions = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };
        const dateOptions: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        };

        const formattedTime = date.toLocaleString('en-US', timeOptions);
        const formattedDate = date.toLocaleString('en-GB', dateOptions);

        return `${formattedTime} | ${formattedDate}`;
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container px-4 h-full">
            <div className='flex justify-between items-start'>
                <h2 className="text-lg font-semibold mb-1">Latest Updates</h2>
                <RefreshCw />
            </div>
            <hr className="border-neutral-200" />
            <table className="w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 border-b text-left pl-1">Name</th>
                        <th className="py-2 border-b text-left pl-2">Time</th>
                        <th className="py-2 border-b text-center">Current Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className='border-b'>
                            <td className="py-1.5 w-2/5 pl-1">{item.name}</td>
                            <td className="py-1.5 w-1/3 pl-2">{formatDateTime(item.updatedAt)}</td>
                            <td className='flex justify-center items-center py-1.5 pr-1'>
                                <div className={`py-1 px-2 text-center rounded-full font-semibold w-24
                                ${
                                    item.status === 'active'
                                        ? 'text-green-700 bg-green-200 border border-green-700'
                                        : 'text-red-700 bg-red-200 border border-red-700'
                                }`}>
                                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTableLastUpdate;
