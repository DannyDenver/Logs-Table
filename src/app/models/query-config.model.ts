export class QueryConfig {
    constructor(searchAttributes: string[], filterValues: string[]) {
        this.searchAttributes = searchAttributes;
        this.filterValues = filterValues
    }
    
    searchAttributes: string[];
    filterValues: string[];
}