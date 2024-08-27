export interface ApiDetails {
    id: string;
    method: string;
    endpoint: string;
    status: string;
    version: string;
    description: string;
    platform: string;
    isNew?: boolean;
    isModified?: boolean;
}

export interface DataRow extends ApiDetails {
    service_api?: {
        name: string;
    };
}
