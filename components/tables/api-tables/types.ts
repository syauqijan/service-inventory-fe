export interface DataRow {
    id: string;
    method: string;
    endpoint: string;
    status: string;
    version: string;
    description: string;
    platform: string;
    service_api: {
        id: string;
        name: string;
    };
    updatedAt: string | null;
    createdAt: string | null;
}
