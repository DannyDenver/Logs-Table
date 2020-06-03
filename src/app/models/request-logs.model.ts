export class RequestLogs {
    results: RequestLog[];
    count: number;
}

export class RequestLog {
    id: number;
    service: string;
    version: string;
    action: string;
    result: string;
    params: any;
    created_at: Date;
}
