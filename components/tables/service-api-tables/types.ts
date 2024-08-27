// Tipe untuk Service API yang sudah ada dalam aplikasi Anda
export interface ServiceApi {
    id: string;
    name: string;
    gitlabUrl: string;
}

// Tipe untuk data API yang ditampilkan di dalam tabel
export interface ApiDetails {
    id: string;
    method: string;
    endpoint: string;
    status: string;
    version: string;
    description: string;
    platform: string;
}

// Tipe untuk setiap baris dalam tabel API
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
    api: ApiDetails;
    updatedAt: string;  // Tambahkan properti ini
    createdAt: string;  // Tambahkan properti ini
}
