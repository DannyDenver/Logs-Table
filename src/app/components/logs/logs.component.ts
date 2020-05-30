import { Component, OnInit } from '@angular/core';
import { Query } from 'src/app/interfaces/query.interface';
import { BehaviorSubject } from 'rxjs';
import { LogsService } from 'src/app/services/logs.service';
import { switchMap } from 'rxjs/operators';
import { QueryConfig } from 'src/app/models/query-config.model';
import { ErrorLogs } from 'src/app/models/error-logs.model';
import * as tableConfigurations from 'src/app/constants';
import { RowPopupConfig } from 'src/app/models/row-popup-config.model';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})

export class LogsComponent implements OnInit {
  errorLogs: ErrorLogs;
  errorLogsQueryConfig = new QueryConfig('Search criteria', ['error_log_id', 'error'], 'Filter by:', ['today', 'this_week', 'this_month', 'this_year']);
  errorRowPopupConfig = new RowPopupConfig('backtrace', 'Backtrace');
  errorQuerySubject: BehaviorSubject<Query>;
  errorQuery: Query;
  errorTableColumnConfig = tableConfigurations.errorTable;

  constructor(private logsService: LogsService) { }

  ngOnInit() {
    this.errorQuery = { page: {size:20, number: 1 } };

    this.errorQuerySubject = new BehaviorSubject<Query>(this.errorQuery);

    this.errorQuerySubject.pipe(switchMap((query: Query) => this.logsService.getErrorLogs(query))).subscribe(errorLogs => {
      this.errorLogs = errorLogs;
    });
  };

  updateQuery(query) {
    this.errorQuery = query;
    this.errorQuerySubject.next(query);
  };
};
