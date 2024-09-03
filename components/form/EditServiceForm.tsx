import React, { useState, useEffect } from 'react';

interface FormState {
    versionService: string;
    id: string;
    name: string;
    username: string;
    gitlabUrl: string;
    description: string;
    yamlSpec: string;
    serviceApiDetailId: string;
    sonarQubeId: string;
    unitTestingId: string;
    updatedAt: string;
    createdAt: string;
    status: string;
    unit_testing: {
        id: string;
        testCasePassed: number;
        testCaseFailed: number;
        coverageStatement: number;
        coverageBranch: number;
        coverageFunction: number;
        coverageLines: number;
    };
    sonarqube: {
        id: string;
        qualityGateStatus: string;
        bugs: string;
        vulnerabilities: string;
        codesmell: string;
        coverage: string;  // Pastikan ini adalah string
        duplication: string;
    }
    user: {
        id: string;
        name: string;
    }
}

interface EditServiceFormProps {
    initialData: FormState;
    onSubmit: (formState: FormState) => Promise<void>;
    yamlSpec: string;
    onYamlSpecChange: () => void;
}

const EditServiceForm: React.FC<EditServiceFormProps> = ({ initialData, onSubmit, yamlSpec, onYamlSpecChange }) => {
    const [formState, setFormState] = useState<FormState>(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const keys = name.split('.');

        if (keys.length === 1) {
            setFormState((prevState) => ({
                ...prevState,
                [keys[0]]: value,
            }));
        } else if (keys.length === 2) {
            const firstKey = keys[0] as keyof FormState;

            setFormState((prevState) => ({
                ...prevState,
                [firstKey]: {
                    ...(prevState[firstKey] as object),
                    [keys[1]]: keys[1].includes('testCase') || keys[1].includes('coverage') && keys[1] !== 'coverage' // Only convert if it's a numeric field, and not `sonarqube.coverage`
                        ? Number(value)
                        : value, // Keep the string as is
                },
            }));
        }
    };

    const handleToggleChange = () => {
        setFormState((prevState) => ({
            ...prevState,
            status: prevState.status === 'active' ? 'inactive' : 'active'
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...formState,
            yamlSpec, // Include the yamlSpec when submitting
        });
    };
    
    return (
        <form onSubmit={handleSubmit} className='text-sm mb-7'>
            <div className='w-1/2'>
                <label className='font-medium'>Service Name</label><br />
                <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className='emailcustom placeholder:opacity-50 mt-1 py-3 px-4 rounded-md border-2 border-solid border-neutral-300 focus:outline-none w-2/3'
                />
            </div>
            <div className='mt-3'>
                <label className='font-medium'>Description</label><br />
                <textarea
                    name="description"
                    value={formState.description}
                    onChange={handleChange}
                    className='min-h-20 mt-1 max-h-20 emailcustom placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid focus:outline-none w-1/2'
                />
            </div>
            <div className='mt-3 w-1/2'>
                <label className='font-medium'>Gitlab URL</label><br />
                <input
                    type="text"
                    name="gitlabUrl"
                    value={formState.gitlabUrl}
                    onChange={handleChange}
                    className='emailcustom placeholder:opacity-50 mt-1 py-3 px-4 rounded-md border-2 border-solid border-neutral-300 focus:outline-none w-2/3'
                />
            </div>
            <div className='w-1/2 mt-3'>
                <label className='font-medium'>Yaml Spec</label><br />
                <textarea
                    name="yamlSpec"
                    value={yamlSpec}
                    readOnly
                    className="h-40 w-96 border hidden"
                />
                <div className='bg-slate-100 text-center py-3 mt-1 rounded-md cursor-pointer w-2/3'
                    onClick={onYamlSpecChange} >
                    <p className='font-semibold'>
                        Open Editor
                    </p>
                </div>
            </div>
            <div className='mt-3 w-1/2'>
                <label className='font-medium'>Version</label><br />
                <input
                    type="text"
                    name="versionService"
                    value={formState.versionService}
                    onChange={handleChange}
                    className='emailcustom placeholder:opacity-50 mt-1 py-3 px-4 rounded-md border-2 border-solid border-neutral-300 focus:outline-none w-2/3'
                />
            </div>

            {/* Toggle Switch */}
            <div className='w-1/2 mt-3'>
                <h3 className='font-medium mb-1'>Service Status</h3>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                        type="checkbox" 
                        name="status"
                        checked={formState.status === 'active'}
                        onChange={handleToggleChange}
                        className="sr-only peer"
                    />
                    <div className="w-12 h-7 bg-gray-200 rounded-full peer peer-focus:ring-gray-300 dark:peer-focus:ring-gray-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900">
                        {formState.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                </label>
            </div>

            <hr />
            <div className='mt-10'>
                <h1 className='text-xl font-semibold mt-3'>SonarQube</h1>
                <p className='pt-1 text-sm font-normal text-slate-500'>Sonarqube detail</p>
                <div className='flex justify-start mt-3'>
                    <div className='w-1/3'>
                        <div>
                            <label className='font-medium'>Quality Gate Status</label><br />
                            <input
                                type="text"
                                name="sonarqube.qualityGateStatus"
                                value={formState.sonarqube.qualityGateStatus}
                                onChange={handleChange}
                                className='mt-1 placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid focus:outline-none w-full'
                            />
                        </div>
                        <div className='mt-4'>
                            <label className='font-medium'>Bugs</label><br />
                            <input
                                type="text"
                                name="sonarqube.bugs"
                                value={formState.sonarqube.bugs}
                                onChange={handleChange}
                                className='mt-1 placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid focus:outline-none w-full'
                            />
                        </div>
                        <div className='mt-4'>
                            <label className='font-medium'>Vulnerabilities</label><br />
                            <input
                                type="text"
                                name="sonarqube.vulnerabilities"
                                value={formState.sonarqube.vulnerabilities}
                                onChange={handleChange}
                                className='mt-1 placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid focus:outline-none w-full'
                            />
                        </div>
                    </div>
                    <div className='w-1/3 ml-14'>
                        <div>
                            <label className='font-medium'>Code Smells</label><br />
                            <input
                                type="text"
                                name="sonarqube.codesmell"
                                value={formState.sonarqube.codesmell}
                                onChange={handleChange}
                                className='mt-1 placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid focus:outline-none w-full'
                            />
                        </div>
                        <div className='mt-4'>
                            <label className='font-medium'>Coverage</label><br />
                            <input
                                type="text"  // Type is text to allow any input
                                name="sonarqube.coverage"
                                value={formState.sonarqube.coverage}
                                onChange={handleChange}
                                className='mt-1 placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid focus:outline-none w-full'
                            />
                        </div>
                        <div className='mt-4'>
                            <label className='font-medium'>Duplication</label><br />
                            <input
                                type="text"
                                name="sonarqube.duplication"
                                value={formState.sonarqube.duplication}
                                onChange={handleChange}
                                className='mt-1 placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid focus:outline-none w-full'
                            />
                        </div>
                    </div>
                </div>
            </div>

            <hr />
            <div className='mt-7 mb-4'>
                <h1 className='text-xl font-semibold mt-3'>Unit Testing</h1>
                <p className='pt-1 text-sm font-normal text-slate-500'>Unit Testing detail</p>
                <div className='flex justify-start mt-3'>
                    <div className='w-1/3'>
                        <div>
                            <label className='font-medium'>Test Case Passed</label><br />
                            <input
                                type="number"
                                name="unit_testing.testCasePassed"
                                value={formState.unit_testing.testCasePassed}
                                onChange={handleChange}
                                className='mt-1 placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid focus:outline-none w-full'
                            />
                        </div>
                        <div className='mt-4'>
                            <label className='font-medium'>Test Case Failed</label><br />
                            <input
                                type="number"
                                name="unit_testing.testCaseFailed"
                                value={formState.unit_testing.testCaseFailed}
                                onChange={handleChange}
                                className='mt-1 placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid focus:outline-none w-full'
                            />
                        </div>
                        <div className='mt-4'>
                            <label className='font-medium'>Coverage Statement</label><br />
                            <input
                                type="number"
                                name="unit_testing.coverageStatement"
                                value={formState.unit_testing.coverageStatement}
                                onChange={handleChange}
                                className='mt-1 placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid focus:outline-none w-full'
                            />
                        </div>
                    </div>
                    <div className='w-1/3 ml-14'>
                        <div>
                            <label className='font-medium'>Coverage Branch</label><br />
                            <input
                                type="number"
                                name="unit_testing.coverageBranch"
                                value={formState.unit_testing.coverageBranch}
                                onChange={handleChange}
                                className='mt-1 placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid focus:outline-none w-full'
                            />
                        </div>
                        <div className='mt-4'>
                            <label className='font-medium'>Coverage Function</label><br />
                            <input
                                type="number"
                                name="unit_testing.coverageFunction"
                                value={formState.unit_testing.coverageFunction}
                                onChange={handleChange}
                                className='mt-1 placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid focus:outline-none w-full'
                            />
                        </div>
                        <div className='mt-4'>
                            <label className='font-medium'>Coverage Lines</label><br />
                            <input
                                type="number"
                                name="unit_testing.coverageLines"
                                value={formState.unit_testing.coverageLines}
                                onChange={handleChange}
                                className='mt-1 placeholder:opacity-50 py-3 px-4 rounded-md border-2 border-solid focus:outline-none w-full'
                            />
                        </div>
                    </div>
                </div>
            </div>

        </form>
    );
};

export default EditServiceForm;
