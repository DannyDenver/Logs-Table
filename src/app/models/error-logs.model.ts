export class ErrorLogs {
    results: ErrorLog[];
    count: number;
}

export class ErrorLog {
    id: number;
    error: string;
    backtrace: string[];
    createdAt: Date;
}