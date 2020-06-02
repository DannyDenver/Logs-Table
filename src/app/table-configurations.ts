import { TableColumn } from './models/table-column.model';

export const errorTable = [
    new TableColumn('ID', 'id', '20vw', true),
    new TableColumn('Error', 'error', '60vw', true),
    new TableColumn('Created At', 'created_at', '20vw', true),
    new TableColumn('Backtrace', 'backtrace', null, false, false)
];

export const requestTable  = [
    new TableColumn('ID', 'id', '20vw', true),
    new TableColumn('Service', 'service', '20vw', true),
    new TableColumn('Action', 'action', '20vw', true),
    new TableColumn('Result', 'result', '20vw', true),
    new TableColumn('Created At', 'created_at', '20vw', true),
    new TableColumn('Params', 'params', null, false, false)
]