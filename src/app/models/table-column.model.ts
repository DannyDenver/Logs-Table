export class TableColumn {
    constructor(label: string, key: string, sortable?: boolean) {
        this.label = label,
        this.key = key
        this.sortable = sortable
    }
    label: string;
    key: string;
    sortable = false;
}