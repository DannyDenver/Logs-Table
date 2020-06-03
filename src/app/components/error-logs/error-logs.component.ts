import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ErrorLogs } from 'src/app/models/error-logs.model';
import { QueryConfig } from 'src/app/models/query-config.model';
import { RowPopupConfig } from 'src/app/models/row-popup-config.model';
import { BehaviorSubject } from 'rxjs';
import * as tableConfigurations from 'src/app/table-configurations';
import { Query } from 'src/app/interfaces/query.interface';
import { LogsService } from 'src/app/services/logs.service';
import { defaultQuery } from 'src/app/constants';
import { switchMap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-error-logs',
  templateUrl: './error-logs.component.html',
  styleUrls: ['./error-logs.component.scss']
})
export class ErrorLogsComponent implements OnInit {
  errorLogs: ErrorLogs;
  errorQuery: Query;
  errorLogsQueryConfig = new QueryConfig(['error_log_id', 'error'], ['today', 'this_week', 'this_month', 'this_year']);
  errorRowPopupConfig = new RowPopupConfig('backtrace', 'Backtrace');
  errorQuerySubject: BehaviorSubject<Query>;
  errorTableColumnConfig = tableConfigurations.errorTable;

  constructor(private logsService: LogsService) { }

  ngOnInit() {
    this.errorQuery = defaultQuery;
    this.errorQuerySubject = new BehaviorSubject<Query>(this.errorQuery);

    setTimeout(() => {
      this.errorQuerySubject.pipe(switchMap((query: Query) => this.logsService.getErrorLogs(query)))
        .subscribe(errorLogs => {
          this.errorLogs = errorLogs;
        });
    }, 400);
  }

  ngOnDestroy() {
    this.errorQuerySubject.unsubscribe();
  }

  updateErrorLogQuery(query: Query) {
    this.errorQuery = query;
    this.errorQuerySubject.next(query);
  }
}
