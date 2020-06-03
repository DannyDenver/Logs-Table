export class TableColumn {
    constructor(label: string, key: string, columnWidth: string, sortable?: boolean, isDisplayed = true) {
        this.label = label;
        this.key = key;
        this.columnWidth = columnWidth;
        this.sortable = sortable;
        this.isDisplayed = isDisplayed;
    }

    label: string;
    key: string;
    columnWidth: string;
    sortable = false;
    isDisplayed = true;
}
