import { Routes } from '@angular/router';
import { ErrorLogsComponent } from './components/error-logs/error-logs.component';
import { RequestLogsComponent } from './components/request-logs/request-logs.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'error-logs',
        pathMatch: 'full'
    },
    {
        path: 'error-logs',
        component: ErrorLogsComponent
    },
    {
        path: 'request-logs',
        component: RequestLogsComponent
    }
];
