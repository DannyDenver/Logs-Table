import { TableColumn } from './models/table-column.model';

export const errorTable = [
    new TableColumn('ID', 'id', '15vw', true),
    new TableColumn('Error', 'error', '60vw', true),
    new TableColumn('Created At', 'created_at', '15vw', true),
    new TableColumn('Backtrace', 'backtrace', null, false, false)
]