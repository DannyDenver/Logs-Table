import { TableColumn } from './models/table-column.model';

export const errorTable = [
    new TableColumn('ID', 'id', true),
    new TableColumn('Error', 'error', true),
    new TableColumn('Created At', 'created_at', true),
    new TableColumn('Backtrace', 'backtrace', false, false)
]