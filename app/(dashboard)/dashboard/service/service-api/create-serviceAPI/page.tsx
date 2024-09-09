'use client';
import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Heading } from '@/components/ui/heading';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { toast } from 'sonner';
import EditorPopup from '@/components/modal/yaml-spec-modal';
import AddRowPopup from '@/components/modal/add-row-popup';
import { Plus } from 'lucide-react';
import axios from 'axios';

// Definisikan tipe untuk setiap baris di tabel
interface RowData {
    method: string;
    endpoint: string;
    status: string;
    description: string;
    version: string;
    platform: string;
}

const breadcrumbItems = [
    { title: 'Main', link: '/dashboard' },
    { title: 'Service', link: '/dashboard/service' },
    { title: 'Add New Service API', link: '/dashboard/service/service-web/create-serviceAPI' }
];

const Page = () => {
    const { user } = useAuth();
    const router = useRouter();
    const [isPopupVisible, setIsPopupVisible] = useState(false);  
    const [isAddRowPopupVisible, setIsAddRowPopupVisible] = useState(false); 
    const [code, setCode] = useState<string>('');  
    const [yamlValue, setYamlValue] = useState<string>('');  
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [rows, setRows] = useState<RowData[]>([]);  
    const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);  
    const [method, setMethod] = useState('');
    const [endpoint, setEndpoint] = useState('');
    const [status, setStatus] = useState(true); 
    const [description, setDescription] = useState('');
    const [version, setVersion] = useState('');
    const [customVersion, setCustomVersion] = useState(''); 
    const [platform, setPlatform] = useState('');
    const userId = user?.userId;
    // State untuk menyimpan status toggle
    const [isActive, setIsActive] = useState(false); // Default: "inactive"

    // Fungsi untuk menangani perubahan toggle
    const handleToggleChange = () => {
        setIsActive(!isActive); // Toggle state
    };

    // State untuk menampung error
    const [errors, setErrors] = useState({
        service_name: '',
        description: '',
        gitlabURL: '',
        versionService: '',
        qualityGateStatus: '',
        vulnerabilities: '',
        coverage: '',
        bugs: '',
        codesmell: '',
        duplication: '',
        coverageStatement: '',
        coverageFunction: '',
        testCasePassed: '',
        coverageBranch: '',
        coverageLines: '',
        testCaseFailed: '',
        yamlSpec: ''
    });

    const validateForm = () => {
        const formData = new FormData(document.querySelector('form')!);
        const newErrors: any = {};
    
        if (!formData.get('service_name')) newErrors.service_name = 'Service name must be filled';
        if (!formData.get('description')) newErrors.description = 'Description must be filled';
        if (!formData.get('gitlabURL')) newErrors.gitlabURL = 'Gitlab URL must be filled';
        if (!formData.get('versionService')) newErrors.versionService = 'versionService must be filled';
        if (!formData.get('qualityGateStatus')) newErrors.qualityGateStatus = 'Status gate must be filled';
        if (!formData.get('vulnerabilities')) newErrors.vulnerabilities = 'Data must be filled';
        if (!formData.get('coverage')) newErrors.coverage = 'Data must be filled';
        if (!formData.get('bugs')) newErrors.bugs = 'Data must be filled';
        if (!formData.get('codesmell')) newErrors.codesmell = 'Data must be filled';
        if (!formData.get('duplication')) newErrors.duplication = 'Data must be filled';
        if (!formData.get('coverageStatement')) newErrors.coverageStatement = 'Data must be filled';
        if (!formData.get('coverageFunction')) newErrors.coverageFunction = 'Data must be filled';
        if (!formData.get('testCasePassed')) newErrors.testCasePassed = 'Data must be filled';
        if (!formData.get('coverageBranch')) newErrors.coverageBranch = 'Data must be filled';
        if (!formData.get('coverageLines')) newErrors.coverageLines = 'Data must be filled';
        if (!formData.get('testCaseFailed')) newErrors.testCaseFailed = 'Data must be filled';
    
        // Tambahkan validasi untuk YAML spec
        if (!yamlValue) newErrors.yamlSpec = 'YAML Spec must be filled';

        // Tambahkan validasi untuk tabel kosong
        if (rows.length === 0) {
            toast.error('At least one API must be added to the table');
            newErrors.rows = 'At least one API must be added';
        }
    
        setErrors(newErrors);
    
        return Object.keys(newErrors).length === 0;
    };
    

    const handleSave = () => {
        setYamlValue(code);  
        setIsPopupVisible(false);
    };

    const handleAddRow = (newRow: RowData) => {
        setRows([...rows, newRow]);
        setIsAddRowPopupVisible(false);
        toast.success('API added successfully');
    };

    const handleEditRow = (index: number) => {
        const rowToEdit = rows[index];
        setEditingRowIndex(index);
        setMethod(rowToEdit.method);
        setEndpoint(rowToEdit.endpoint);
        setStatus(rowToEdit.status === 'active');
        setDescription(rowToEdit.description);
        setVersion(rowToEdit.version);
        setPlatform(rowToEdit.platform);
        setIsAddRowPopupVisible(true);
    };

    const handleDeleteRow = (index: number) => {
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setRows(updatedRows);
        toast.success('API deleted successfully');
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        if (!validateForm()) {
            return;
        }
    
        try {
            setIsLoading(true);
            const formData = new FormData(event.currentTarget);
    
            const sonarQubeData = {
                qualityGateStatus: formData.get('qualityGateStatus'),
                vulnerabilities: formData.get('vulnerabilities'),
                coverage: formData.get('coverage'),
                bugs: formData.get('bugs'),
                codesmell: formData.get('codesmell'),
                duplication: formData.get('duplication')
            };
    
            const sonarQubeResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_SONARQUBE}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sonarQubeData),
            });
    
            if (!sonarQubeResponse.ok) {
                throw new Error('Failed to save SonarQube data');
            }
    
            const sonarQubeResult = await sonarQubeResponse.json();
            const sonarQubeId = sonarQubeResult.id;
    
            if (!sonarQubeId) {
                throw new Error('SonarQube ID is undefined');
            }
    
            const unitTestingData = {
                coverageStatement: formData.get('coverageStatement'),
                coverageFunction: formData.get('coverageFunction'),
                testCasePassed: formData.get('testCasePassed'),
                coverageBranch: formData.get('coverageBranch'),
                coverageLines: formData.get('coverageLines'),
                testCaseFailed: formData.get('testCaseFailed')
            };
    
            const unitTestingResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_UNITTESTING}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(unitTestingData),
            });
    
            if (!unitTestingResponse.ok) {
                const errorMessage = await unitTestingResponse.text();
                console.error('Unit Testing API Error:', unitTestingResponse.status, errorMessage);
                throw new Error('Failed to save Unit Testing data');
            }
    
            const unitTestingResult = await unitTestingResponse.json();
            const unitTestingId = unitTestingResult.id;
    
            if (!unitTestingId) {
                throw new Error('Unit Testing ID is undefined');
            }
    
            const serviceApiData = {
                name: formData.get('service_name'),
                description: formData.get('description'),
                gitlabUrl: formData.get('gitlabURL'),
                versionService: formData.get('versionService'),
                status: formData.get('status'),
                yamlSpec: yamlValue,
                sonarQubeId,
                unitTestingId,
                ownerId: user?.userId,
                createdBy: user?.userId,
            };
    
            const serviceApiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_SERVICEAPIS}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(serviceApiData),
            });
    
            if (!serviceApiResponse.ok) {
                const errorData = await serviceApiResponse.json();  // Ambil data error dari respons
                if (errorData.errors) {
                    setErrors(errorData.errors);  // Update state errors dengan pesan dari backend
                }
                throw new Error('Failed to save service API data');
            }
    
            const serviceApiResult = await serviceApiResponse.json();
            const serviceApiId = serviceApiResult.id;
    
            if (!serviceApiId) {
                throw new Error('Service API ID is undefined');
            }
    
            console.log("Service API ID:", serviceApiId);
    
            for (const api of rows) {
                const apiData = {
                    service_api_id: serviceApiId,
                    endpoint: api.endpoint,
                    description: api.description,
                    method: api.method,
                    status: api.status,
                    version: api.version,
                    platform: api.platform,
                };
    
                console.log("API Data to be sent:", apiData);
    
                const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_APIS}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(apiData),
                });
    
                if (!apiResponse.ok) {
                    throw new Error('Failed to save API data');
                }
            }
    
            toast.success('Data saved successfully');
            router.push('/dashboard/service');
        } catch (error) {
            console.error('Error saving data:', error);
            toast.error('Failed to save data');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className='flex overflow-y-auto'>
            <div className="flex-1 space-y-4 p-4 md:p-8">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="flex items-start justify-between">
                    <Heading
                        title="Add New Service API"
                        description="Add a new service API"
                    />
                </div>
                <hr className="border-neutral-200" />
                <div className='text-sm'>
                    <form onSubmit={handleSubmit}>
                        <div className='w-1/2'>
                            <h3 className='font-medium mb-1'>Service Name</h3>
                            <input 
                                type="text" 
                                name='service_name' 
                                placeholder="Enter Service Name" 
                                className={`emailcustom placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid ${errors.service_name ? 'border-red-600' : 'border-neutral-300'} focus:outline-none w-2/3`} 
                            />
                            {errors.service_name && <p className="text-red-600 text-sm mt-1">{errors.service_name}</p>}
                        </div>
                        <div className='mt-3'>
                            <h3 className='font-medium mb-1'>Description</h3>
                            <textarea 
                                name='description' 
                                placeholder="Enter description" 
                                className={`min-h-20 max-h-20 emailcustom placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid ${errors.description ? 'border-red-600' : 'border-neutral-300'} focus:outline-none w-1/2`} 
                            ></textarea>
                            {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
                        </div>
                        <div className='w-1/2 mt-3'>
                            <h3 className='font-medium mb-1'>Gitlab url</h3>
                            <input 
                                type="text" 
                                name='gitlabURL' 
                                placeholder="Enter link" 
                                className={`emailcustom placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid ${errors.gitlabURL ? 'border-red-600' : 'border-neutral-300'} focus:outline-none w-2/3`} 
                            />
                            {errors.gitlabURL && <p className="text-red-600 text-sm mt-1">{errors.gitlabURL}</p>}
                        </div>
                        <div className='w-1/2 mt-3'>
                            <h3 className='font-medium mb-1'>YAML Spec</h3>
                            <div className='bg-slate-100 text-center py-3 rounded-md cursor-pointer w-2/3'
                                onClick={() => setIsPopupVisible(true)} >
                                <p className='font-semibold'>
                                    Open Editor
                                </p>
                            </div>
                            <textarea
                                value={yamlValue}
                                name='yamlValue'
                                onChange={(e) => setYamlValue(e.target.value)}
                                placeholder="Your YAML code will appear here after saving"
                                className={`hidden min-h-20 max-h-40 emailcustom placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid focus:outline-none w-2/3`}
                            />
                            {errors.yamlSpec && <p className="text-red-600 text-sm mt-1">{errors.yamlSpec}</p>}
                        </div>
                        <div className='w-1/2 mt-3'>
                            <h3 className='font-medium mb-1'>Version</h3>
                            <input 
                                type="text" 
                                name='versionService' 
                                placeholder="Enter versionService" 
                                className={`emailcustom placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid ${errors.versionService ? 'border-red-600' : 'border-neutral-300'} focus:outline-none w-2/3`} 
                            />
                            {errors.versionService && <p className="text-red-600 text-sm mt-1">{errors.versionService}</p>}
                        </div>
                        <div className='w-1/2 mt-3'>
                            <h3 className='font-medium mb-1'>Status</h3>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={isActive} // Mengontrol checkbox dengan state
                                    onChange={handleToggleChange} // Handle perubahan toggle
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                <span className="ml-3 text-sm font-medium text-gray-900">
                                    {isActive ? 'Active' : 'Inactive'}
                                </span>
                            </label>
                            {/* Input hidden untuk mengirim nilai yang diinginkan */}
                            <input 
                                type="hidden" 
                                name="status" 
                                value={isActive ? "active" : "inactive"}
                            />
                        </div>
                        <div className='mt-10'>
                            <h1 className='text-xl font-semibold mt-3'>
                                Sonarqube
                            </h1>
                            <p className='pt-1 text-sm font-normal text-slate-500'>Sonarqube detail</p>
                            <div className='flex justify-start mt-3'>
                                <div className='w-1/3'>
                                    <div>
                                        <h3 className='font-medium mb-1'>Quality Gate Status</h3>
                                        <input 
                                            type="text" 
                                            name='qualityGateStatus' 
                                            placeholder="Enter Status" 
                                            className={`placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid ${errors.qualityGateStatus ? 'border-red-600' : 'border-neutral-300'} focus:outline-none w-full`} 
                                        />
                                        {errors.qualityGateStatus && <p className="text-red-600 text-sm mt-1">{errors.qualityGateStatus}</p>}
                                    </div>
                                    <div className='mt-4'>
                                        <h3 className='font-medium mb-1'>Vulnerabilities</h3>
                                        <input 
                                            type="text" 
                                            name='vulnerabilities' 
                                            placeholder="Enter Data" 
                                            className={`placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid ${errors.vulnerabilities ? 'border-red-600' : 'border-neutral-300'} focus:outline-none w-full`} 
                                        />
                                        {errors.vulnerabilities && <p className="text-red-600 text-sm mt-1">{errors.vulnerabilities}</p>}
                                    </div>
                                    <div className='mt-4'>
                                        <h3 className='font-medium mb-1'>Coverage</h3>
                                        <input 
                                            type="text" 
                                            name='coverage' 
                                            placeholder="Enter Data" 
                                            className={`placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid ${errors.coverage ? 'border-red-600' : 'border-neutral-300'} focus:outline-none w-full`} 
                                        />
                                        {errors.coverage && <p className="text-red-600 text-sm mt-1">{errors.coverage}</p>}
                                    </div>
                                </div>
                                <div className='w-1/3 ml-14'>
                                    <div>
                                        <h3 className='font-medium mb-1'>Bugs</h3>
                                        <input 
                                            type="text" 
                                            name='bugs' 
                                            placeholder="Enter Data" 
                                            className={`placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid ${errors.bugs ? 'border-red-600' : 'border-neutral-300'} focus:outline-none w-full`} 
                                        />
                                        {errors.bugs && <p className="text-red-600 text-sm mt-1">{errors.bugs}</p>}
                                    </div>
                                    <div className='mt-4'>
                                        <h3 className='font-medium mb-1'>Codesmell</h3>
                                        <input 
                                            type="text" 
                                            name='codesmell' 
                                            placeholder="Enter Data" 
                                            className={`placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid ${errors.codesmell ? 'border-red-600' : 'border-neutral-300'} focus:outline-none w-full`} 
                                        />
                                        {errors.codesmell && <p className="text-red-600 text-sm mt-1">{errors.codesmell}</p>}
                                    </div>
                                    <div className='mt-4'>
                                        <h3 className='font-medium mb-1'>Duplication</h3>
                                        <input 
                                            type="text" 
                                            name='duplication' 
                                            placeholder="Enter Data" 
                                            className={`placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid ${errors.duplication ? 'border-red-600' : 'border-neutral-300'} focus:outline-none w-full`} 
                                        />
                                        {errors.duplication && <p className="text-red-600 text-sm mt-1">{errors.duplication}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='mt-7'>
                            <h1 className='text-xl font-semibold mt-3'>
                                Unit Testing
                            </h1>
                            <p className='pt-1 text-sm font-normal text-slate-500'>Unit testing detail</p>
                            <div className='flex justify-start mt-3'>
                                <div className='w-1/3'>
                                    <div>
                                        <h3 className='font-medium mb-1'>Coverage Statement</h3>
                                        <input 
                                            type="number" 
                                            name='coverageStatement' 
                                            placeholder="Enter Data" 
                                            className={`placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid ${errors.coverageStatement ? 'border-red-600' : 'border-neutral-300'} focus:outline-none w-full`} 
                                        />
                                        {errors.coverageStatement && <p className="text-red-600 text-sm mt-1">{errors.coverageStatement}</p>}
                                    </div>
                                    <div className='mt-4'>
                                        <h3 className='font-medium mb-1'>Coverage Function</h3>
                                        <input 
                                            type="number" 
                                            name='coverageFunction' 
                                            placeholder="Enter Data" 
                                            className={`placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid ${errors.coverageFunction ? 'border-red-600' : 'border-neutral-300'} focus:outline-none w-full`} 
                                        />
                                        {errors.coverageFunction && <p className="text-red-600 text-sm mt-1">{errors.coverageFunction}</p>}
                                    </div>
                                    <div className='mt-4'>
                                        <h3 className='font-medium mb-1'>Test Case Passed</h3>
                                        <input 
                                            type="number" 
                                            name='testCasePassed' 
                                            placeholder="Enter Data" 
                                            className={`placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid ${errors.testCasePassed ? 'border-red-600' : 'border-neutral-300'} focus:outline-none w-full`} 
                                        />
                                        {errors.testCasePassed && <p className="text-red-600 text-sm mt-1">{errors.testCasePassed}</p>}
                                    </div>
                                </div>
                                <div className='w-1/3 ml-14'>
                                    <div>
                                        <h3 className='font-medium mb-1'>Coverage Branch</h3>
                                        <input 
                                            type="number" 
                                            name='coverageBranch' 
                                            placeholder="Enter Data" 
                                            className={`placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid ${errors.coverageBranch ? 'border-red-600' : 'border-neutral-300'} focus:outline-none w-full`} 
                                        />
                                        {errors.coverageBranch && <p className="text-red-600 text-sm mt-1">{errors.coverageBranch}</p>}
                                    </div>
                                    <div className='mt-4'>
                                        <h3 className='font-medium mb-1'>Coverage Lines</h3>
                                        <input 
                                            type="number" 
                                            name='coverageLines' 
                                            placeholder="Enter Data" 
                                            className={`placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid ${errors.coverageLines ? 'border-red-600' : 'border-neutral-300'} focus:outline-none w-full`} 
                                        />
                                        {errors.coverageLines && <p className="text-red-600 text-sm mt-1">{errors.coverageLines}</p>}
                                    </div>
                                    <div className='mt-4'>
                                        <h3 className='font-medium mb-1'>Test Case Failed</h3>
                                        <input 
                                            type="number" 
                                            name='testCaseFailed' 
                                            placeholder="Enter Data" 
                                            className={`placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid ${errors.testCaseFailed ? 'border-red-600' : 'border-neutral-300'} focus:outline-none w-full`} 
                                        />
                                        {errors.testCaseFailed && <p className="text-red-600 text-sm mt-1">{errors.testCaseFailed}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tabel untuk Method, Endpoint, Status, Description, Version, Platform */}
                        <div className='mt-7 mr-8'>
                            <div className='flex justify-start mb-6'>
                                <div className='w-1/2'>
                                    <h1 className='text-xl font-semibold mt-3'>
                                        APIs
                                    </h1>
                                    <p className='mt-1 text-gray-500 font-normal'>Add connected API</p>
                                </div>
                                <div className='w-1/2 flex justify-end mt-2'>
                                    <button type="button" className="mt-3 justify-center items-center inline-flex w-20 h-10 bg-white border-2 text-black px-1 py-1 rounded-md font-semibold" onClick={() => setIsAddRowPopupVisible(true)}>
                                        <Plus className="mr-2 h-4 w-4" /> Add
                                    </button>
                                </div>
                            </div>
                            <table className="min-w-full bg-white border-gray-200 mt-2">
                                <thead>
                                    <tr className='border-b'>
                                        <th className="py-2 px-4 text-left">Method</th>
                                        <th className="py-2 px-4 text-left">Endpoint</th>
                                        <th className="py-2 px-4 text-center">Version</th>
                                        <th className="py-2 px-4 text-center">Status</th>
                                        <th className="py-2 px-4 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="text-center py-4 text-gray-500">
                                                There is no API
                                            </td>
                                        </tr>
                                    ) : (
                                        rows.map((row, index) => (
                                            <tr key={index} className='border-b'>
                                                <td className="py-2 px-4">{row.method.toUpperCase()}</td>
                                                <td className="py-2 px-4"><p className='max-w-xl'>{row.endpoint}</p></td>
                                                <td className="py-2 px-4"><p className='max-w-xl text-center'>{row.version}</p></td>
                                                <td className={`flex justify-center py-2 px-4 text-center ${row.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                                                    <span className={`px-2 py-1 self-center rounded-full flex items-center justify-center w-20 border ${row.status === 'active' ? 'bg-green/200 border-green/600 text-green/600' : 'bg-red/200 border-red/600 text-red/600'}`}>
                                                        {row.status}
                                                    </span>
                                                </td>
                                                <td className="py-2 px-4 text-center">
                                                    <div className='flex justify-center'>
                                                        <h2 className="cursor-pointer"
                                                            onClick={() => handleEditRow(index)}
                                                        >
                                                            Edit
                                                        </h2>
                                                        <h2 className="cursor-pointer text-red-600 ml-4"
                                                            onClick={() => handleDeleteRow(index)}
                                                        >
                                                            Delete
                                                        </h2>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className='mt-20 flex justify-between pr-16'>
                            <p className='active:scale-95 min-w-16 form-flex justify-center items-center py-3 px-4 gap-2 cursor-pointer rounded-md shadow-sm text-red-600 bg-white border border-red-600 w-20 mt-3 mb-1 ml-3 font-semibold text-center' onClick={() => router.back()}>Cancel</p>
                            <input type="submit" value="Save" className="active:scale-95 min-w-16 form-flex justify-center items-center border py-3 px-4 gap-2 cursor-pointer rounded-md shadow-sm text-white bg-red-600 w-20 mt-3 mb-1 ml-3 font-semibold"
                            />
                        </div>
                    </form>
                </div>
            </div>
            <EditorPopup isVisible={isPopupVisible} onClose={() => setIsPopupVisible(false)} code={code} setCode={setCode} onSave={handleSave} />
            <AddRowPopup 
                isVisible={isAddRowPopupVisible} 
                onClose={() => {
                    setEditingRowIndex(null);
                    setIsAddRowPopupVisible(false);
                }} 
                onAddRow={handleAddRow} 
                method={method}
                setMethod={setMethod}
                endpoint={endpoint}
                setEndpoint={setEndpoint}
                status={status}
                setStatus={setStatus}
                description={description}
                setDescription={setDescription}
                version={version}
                setVersion={setVersion}
                customVersion={customVersion}
                setCustomVersion={setCustomVersion}
                platform={platform}
                setPlatform={setPlatform}
                onSave={() => {
                    if (editingRowIndex !== null) {
                        const updatedRows = [...rows];
                        updatedRows[editingRowIndex] = { method, endpoint, status: status ? 'active' : 'inactive', description, version: version === 'custom' ? customVersion : version, platform };
                        setRows(updatedRows);
                        setEditingRowIndex(null);
                    } else {
                        handleAddRow({ method, endpoint, status: status ? 'active' : 'inactive', description, version: version === 'custom' ? customVersion : version, platform });
                    }
                    setIsAddRowPopupVisible(false);
                }}
            />
        </div>
    );
}

export default Page;
