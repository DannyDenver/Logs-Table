import { Component, OnInit } from '@angular/core';
import { ErrorLogs } from 'src/app/models/error-logs.model';
import { QueryConfig } from 'src/app/models/query-config.model';
import { RowPopupConfig } from 'src/app/models/row-popup-config.model';
import { BehaviorSubject } from 'rxjs';
import * as tableConfigurations from 'src/app/table-configurations';
import { Query } from 'src/app/interfaces/query.interface';
import { LogsService } from 'src/app/services/logs.service';
import { defaultQuery } from 'src/app/constants';
import { switchMap } from 'rxjs/operators';
import { RequestLogs } from 'src/app/models/request-logs.model';

@Component({
  selector: 'app-request-logs',
  templateUrl: './request-logs.component.html',
  styleUrls: ['./request-logs.component.scss']
})
export class RequestLogsComponent implements OnInit {
  requestLogs: RequestLogs;
  requestQuery: Query;
  requestQueryConfig = new QueryConfig(['service', 'version', 'action', 'result'], ['successful', 'this_week']);
  requestRowPopupConfig = new RowPopupConfig('params', 'Parameters');
  requestQuerySubject: BehaviorSubject<Query>;
  requestTableColumnConfig = tableConfigurations.requestTable;

  constructor(private logsService: LogsService) { }

  ngOnInit() {
    this.requestQuery = defaultQuery;
    this.requestQuerySubject = new BehaviorSubject<Query>(this.requestQuery);

    setTimeout(() => {
      this.requestQuerySubject.pipe(switchMap((query: Query) => this.logsService.getRequestLogs(query)))
        .subscribe(errorLogs => {
          this.requestLogs = errorLogs;
        });
    }, 400);
  }

  ngOnDestroy() {
    this.requestQuerySubject.unsubscribe();
  }

  updateRequestLogQuery(query: Query) {
    this.requestQuery = query;
    this.requestQuerySubject.next(query);
  }
}
