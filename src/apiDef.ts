export interface ApiCompany {
    id: number;
    name: string;
    url: string;
}

export interface ApiProfile {
    id: number;
    name: string;
    surname: string;
    phone?: string | null;
    company: number;
}

