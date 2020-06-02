export interface Query {
    view?: string;
    count?: boolean;
    search?: {
        term: string;
        attributes: string[];
    };
    filters?: string[];
    page: {
        size: Number;
        number: number;
    };
    sort?: {
        by: string;
        order: string;
    };
}
