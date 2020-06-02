import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Query } from 'src/app/interfaces/query.interface';
import { BehaviorSubject } from 'rxjs';
import { LogsService } from 'src/app/services/logs.service';
import { switchMap } from 'rxjs/operators';
import { QueryConfig } from 'src/app/models/query-config.model';
import { ErrorLogs } from 'src/app/models/error-logs.model';
import * as tableConfigurations from 'src/app/table-configurations';
import { RowPopupConfig } from 'src/app/models/row-popup-config.model';
import { RequestLogs } from 'src/app/models/request-logs.model';
import { defaultQuery } from 'src/app/constants';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class LogsComponent implements OnInit, OnDestroy {
  errorLogs: ErrorLogs;
  errorQuery: Query;
  errorLogsQueryConfig = new QueryConfig(['error_log_id', 'error'], ['today', 'this_week', 'this_month', 'this_year']);
  errorRowPopupConfig = new RowPopupConfig('backtrace', 'Backtrace');
  errorQuerySubject: BehaviorSubject<Query>;
  errorTableColumnConfig = tableConfigurations.errorTable;

  requestLogs: RequestLogs;
  requestQuery: Query;
  requestQueryConfig = new QueryConfig(['service', 'version', 'action', 'result'],['successful', 'this_week']);
  requestRowPopupConfig = new RowPopupConfig('params', 'Parameters'); 
  requestQuerySubject: BehaviorSubject<Query>;
  requestTableColumnConfig = tableConfigurations.requestTable;

  constructor(private logsService: LogsService) { }

  ngOnInit() {
    this.errorQuery = defaultQuery;

    this.errorQuerySubject = new BehaviorSubject<Query>(this.errorQuery);

    this.errorQuerySubject.pipe(switchMap((query: Query) => this.logsService.getErrorLogs(query))).subscribe(errorLogs => {
      this.errorLogs = errorLogs;
    });
    
    this.requestQuery = defaultQuery;

    this.requestQuerySubject = new BehaviorSubject<Query>(this.requestQuery);

    this.requestQuerySubject.pipe(switchMap((query: Query) => this.logsService.getRequestLogs(query))).subscribe((requestLogs: RequestLogs) => {
      this.requestLogs = requestLogs;
    });   
  };

  ngOnDestroy() {
    this.requestQuerySubject.unsubscribe();
    this.errorQuerySubject.unsubscribe();
  }
  
  updateQuery(query: Query) {
    this.errorQuery = query;
    this.errorQuerySubject.next(query);
  };

  updateRequestQuery(query: Query) {
    this.requestQuery = query;
    this.requestQuerySubject.next(query);
  };
};
