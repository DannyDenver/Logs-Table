import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QueryConfig } from 'src/app/models/query-config.model';
import { Query } from 'src/app/interfaces/query.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TableColumn } from 'src/app/models/table-column.model';
import { debounceTime } from 'rxjs/operators';
import { TableData } from 'src/app/interfaces/table-data.interface';


@Component({
  selector: 'app-table-layout',
  templateUrl: './table-layout.component.html',
  styleUrls: ['./table-layout.component.scss']
})
export class TableLayoutComponent implements OnInit {
  @Input() caption:string;
  @Input() data: TableData;
  @Input() columnConfig: TableColumn[];
  @Input() query: Query;
  @Input() queryConfig: QueryConfig;
  @Output() updatedQuery: EventEmitter<any> = new EventEmitter();
  queryForm: FormGroup;

  get columnLabels() { return this.columnConfig.map(x => x.label); }
  get columnKeys() { return this.columnConfig.map(x => x.key)};
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.queryForm = this.fb.group({
      filter: '',
      search: '',
      searchCriteria: '',
      pageNumber: '',
      pageSize: '',
      sortBy: '',
      sortOrder: ''
    });

    this.onChanges();
  }

  onChanges(): void {
    this.queryForm.valueChanges.pipe(debounceTime(500)).subscribe(val => {
      const query = Object.assign({}, this.query);

      query.filters = [val.filter];
      query.search = { term: val.search, attributes: [val.searchCriteria]};
      query.sort = {by: val.sortBy, order: val.sortOrder };
      
      query.page = { size: val.pageSize, number: val.pageNumber }
      
      this.updatedQuery.emit(query)
    })
  }

  onSortChanges($event) {
    this.queryForm.get('sortBy').setValue($event.active);
    this.queryForm.get('sortOrder').setValue($event.direction);
  }

  onPageChange($event) {
    this.queryForm.get('pageNumber').setValue($event.pageIndex);
    this.queryForm.get('pageSize').setValue($event.pageSize);

  }
}
