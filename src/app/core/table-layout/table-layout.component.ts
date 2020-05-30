import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { QueryConfig } from 'src/app/models/query-config.model';
import { Query } from 'src/app/interfaces/query.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TableColumn } from 'src/app/models/table-column.model';
import { debounceTime } from 'rxjs/operators';
import { TableData } from 'src/app/interfaces/table-data.interface';
import * as objectUtils from '../../utils/object-utils';
import { MatDialog } from '@angular/material/dialog';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';
import { RowPopupConfig } from 'src/app/models/row-popup-config.model';

@Component({
  selector: 'app-table-layout',
  templateUrl: './table-layout.component.html',
  styleUrls: ['./table-layout.component.scss']
})
export class TableLayoutComponent implements OnChanges {
  @Input() caption:string;
  @Input() data: TableData;
  @Input() columnConfig: TableColumn[];
  @Input() rowPopupConfig: RowPopupConfig;
  @Input() query: Query;
  @Input() queryConfig: QueryConfig;
  @Output() updatedQuery: EventEmitter<any> = new EventEmitter();
  queryForm: FormGroup;

  get columnKeys() { 
    let keys = this.columnConfig.filter(x =>x.isDisplayed).map(x => x.key);
  return keys
};
  get displayedColumns() { return this.columnConfig.filter(x => x.isDisplayed)}

  
  constructor(private fb: FormBuilder, public dialog: MatDialog,) { }

  ngOnChanges() { 
    if(this.query && !this.queryForm) {
      this.queryForm = this.fb.group({
        filter: '',
        search: '',
        searchCriteria: '',
        pageNumber: this.query.page.number,
        pageSize: this.query.page.size,
        sortBy: '',
        sortOrder: ''
      });
      
      this.onChanges();
    }
  }

  onChanges(): void {
    this.queryForm.valueChanges.pipe(debounceTime(0)).subscribe(val => {
      let query = Object.assign({}, this.query);

      if(val.filter) {
        query.filters = [val.filter];
      }

      if(val.search && val.searchCriteria) {
        query.search = { term: val.search, attributes: [val.searchCriteria]};
      }

      if(val.sortBy && val.sortOrder) {
        query.sort = {by: val.sortBy, order: val.sortOrder };
      }
      
      query.page = { size: val.pageSize, number: val.pageNumber }

      query = objectUtils.removeEmptyProperties(query);

      this.updatedQuery.emit(query)
    })
  }

  onSortChanges($event) {
    this.queryForm.get('sortBy').setValue($event.active);
    this.queryForm.get('sortOrder').setValue($event.direction);
  }

  openRowDialog(data) {
    this.dialog.open(PopupModalComponent, {
      data: {
        label: this.rowPopupConfig.label,
        text: data[this.rowPopupConfig.key]
      }
    })
  }

  onPageChange($event) {
    this.queryForm.get('pageNumber').setValue($event.pageIndex + 1);
    this.queryForm.get('pageSize').setValue($event.pageSize);
  }
}
