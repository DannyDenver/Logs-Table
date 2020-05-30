export class QueryConfig {
    constructor(searchLabel: string, searchAttributes: string[], filterLabel: string, filterValues: string[]) {
        this.search = { label: searchLabel,  attributes: searchAttributes },
        this.filter = { label: filterLabel, values: filterValues}
    }

    search: { 
        label: string,
        attributes: string[],
    };
    
    filter: {
        label: string,
        values?: string[],
    }
}