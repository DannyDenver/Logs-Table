export interface Query {
    view?: string;
    count?: boolean;
    search?: {
        term: string;
        attributes: string[];
    };
    filters?: string[];
    page: {
        size: number;
        number: number;
    };
    sort?: {
        by: string;
        order: string;
    };
}
