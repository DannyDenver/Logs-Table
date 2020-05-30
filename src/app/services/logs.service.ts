import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { createQueryString } from '../utils/string-utils';
import { HttpClient } from '@angular/common/http';
import { Query } from '../interfaces/query.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  requestLogsUrl = environment.requestLogsUrl
  errorLogsUrl = environment.errorLogsUrl

  constructor(private http: HttpClient) { }

  getRequestLogs(query: Query):Observable<any> {
    const queryParmams = createQueryString(query);

    return this.http.post<any>(this.requestLogsUrl + queryParmams, null);
  }

  getErrorLogs(query: Query):Observable<any> {
    query.view = 'dashboard_index';
    query.count = true;
    const queryParmams = createQueryString(query);

    return this.http.post<any>(this.errorLogsUrl, query).pipe(map(result => result['data']));
  }
}
