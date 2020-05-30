export interface Query {
    view?: "dashboard_index"
    count?: true;
    search?: {
        term: string;
        attributes: string[]
    };
    filters?: string[];
    page: {
        size: Number;
        number: number;
    }
    sort?: {
        by: string;
        order: string
    }
}