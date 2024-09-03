import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Compass } from 'lucide-react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartOptions,
    ChartData,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface UnitTestingData {
    coverageStatement: number;
    coverageBranch: number;
    coverageFunction: number;
    coverageLines: number;
}

const CoveragePieChart: React.FC = () => {
    const [chartData, setChartData] = useState<ChartData<'doughnut'>>({
        labels: ['Red (0-69)', 'Yellow (70-80)', 'Green (81-100)'],
        datasets: [
            {
                label: '',
                data: [0, 0, 0],
                backgroundColor: ['#FF6384', '#FFCE56', '#009107'],
                hoverOffset: 4
            }
        ]
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedMetric, setSelectedMetric] = useState<keyof UnitTestingData>('coverageStatement'); // Default metric

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT_UNITTESTING || '';
                console.log('Fetching data from:', apiUrl);

                const response = await axios.get(apiUrl);
                console.log('Data from API:', response.data);

                const apiData: UnitTestingData[] = response.data.unitTesting;

                if (!apiData || !Array.isArray(apiData)) {
                    throw new Error('Invalid data structure from API');
                }

                updateChartData(apiData, selectedMetric);
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
    }, [selectedMetric]);

    const updateChartData = (apiData: UnitTestingData[], metric: keyof UnitTestingData) => {
        const redCount = apiData.filter(item => item[metric] >= 0 && item[metric] <= 69).length;
        const yellowCount = apiData.filter(item => item[metric] >= 70 && item[metric] <= 80).length;
        const greenCount = apiData.filter(item => item[metric] >= 81).length;

        const totalCount = redCount + yellowCount + greenCount;

        const newChartData = {
            labels: ['Red', 'Yellow', 'Green'],
            datasets: [
                {
                    label: `${metric} Distribution`,
                    data: [redCount, yellowCount, greenCount],
                    backgroundColor: ['#FF6384', '#FFCE56', '#009107'],
                    hoverOffset: 4
                }
            ]
        };

        // Set chart data with percentage calculations
        setTimeout(() => {
            setChartData(newChartData);
        }, 100); // Delay 100ms
    };

    const options: ChartOptions<'doughnut'> = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (tooltipItem: any) {
                        const label = tooltipItem.label || '';
                        const value = tooltipItem.raw || '';
                        return `${label}: ${value}`;
                    }
                }
            },
            legend: {
                display: false, // Sembunyikan legend default Chart.js
            }
        },
        cutout: '55%', // membuat doughnut
        animation: {
            animateScale: true,
            animateRotate: true,
            duration: 800, // Durasi transisi dalam milidetik
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const redPercent = chartData?.datasets[0]?.data[0] ? ((chartData.datasets[0].data[0] as number) / (chartData.datasets[0].data.reduce((a, b) => a + (b as number), 0))) * 100 : 0;
    const yellowPercent = chartData?.datasets[0]?.data[1] ? ((chartData.datasets[0].data[1] as number) / (chartData.datasets[0].data.reduce((a, b) => a + (b as number), 0))) * 100 : 0;
    const greenPercent = chartData?.datasets[0]?.data[2] ? ((chartData.datasets[0].data[2] as number) / (chartData.datasets[0].data.reduce((a, b) => a + (b as number), 0))) * 100 : 0;

    return (
        <div>
            <div className='px-4 mb-4 h-full'>
                <div className='flex justify-between items-start'>
                    <h1 className='text-lg font-semibold'>Services Statistics</h1>
                    <Compass />
                </div>
                <div className='flex justify-between mt-1'>
                    <label htmlFor="metricSelect" className='pt-1'>Select & hover graph to see number </label>
                    <select
                        id="metricSelect"
                        value={selectedMetric}
                        onChange={(e) => setSelectedMetric(e.target.value as keyof UnitTestingData)}
                        className='border-2 px-2 py-1 ml-12 rounded-md'
                    >
                        <option value="coverageStatement">Coverage Statement</option>
                        <option value="coverageBranch">Coverage Branch</option>
                        <option value="coverageFunction">Coverage Function</option>
                        <option value="coverageLines">Coverage Lines</option>
                    </select>
                </div>
            </div>
            <hr className="border-neutral-200" />
            <div className='items-center flex justify-center pl-4 pb-5 pt-6'>
                <div className='w-1/2'>
                    {chartData ? <Doughnut data={chartData} options={options} key={selectedMetric} /> : <p>No data available</p>}
                </div>
                <div className='w-1/2 pl-8'>
                    <ul style={{ listStyle: 'none', paddingLeft: '0', marginTop: '0' }}>
                        <li className='text-md flex items-center mb-2'>
                            <div style={{ backgroundColor: '#009107', width: '20px', height: '20px', marginRight: '8px', borderRadius: '4px' }}></div>
                            Above 80: {greenPercent.toFixed(2)}%
                        </li>
                        <li className='text-md flex items-center mb-2'>
                            <div style={{ backgroundColor: '#FFCE56', width: '20px', height: '20px', marginRight: '8px', borderRadius: '4px' }}></div>
                            Between 70 - 80: {yellowPercent.toFixed(2)}%
                        </li>
                        <li className='text-md flex items-center'>
                            <div style={{ backgroundColor: '#FF6384', width: '20px', height: '20px', marginRight: '8px', borderRadius: '4px' }}></div>
                            Below 50: {redPercent.toFixed(2)}%
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CoveragePieChart;
