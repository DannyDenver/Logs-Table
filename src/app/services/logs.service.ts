import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Query } from '../interfaces/query.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestLogs } from '../models/request-logs.model';
import { ErrorLogs } from '../models/error-logs.model';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  requestLogsUrl = environment.requestLogsUrl;
  errorLogsUrl = environment.errorLogsUrl;

  constructor(private http: HttpClient) { }

  getRequestLogs(query: Query): Observable<RequestLogs> {
    return this.http.post<Query>(this.requestLogsUrl, query).pipe(map(result => result['data']));
  }

  getErrorLogs(query: Query): Observable<ErrorLogs> {
    return this.http.post<Query>(this.errorLogsUrl, query).pipe(map(result => result['data']));
  }
}
