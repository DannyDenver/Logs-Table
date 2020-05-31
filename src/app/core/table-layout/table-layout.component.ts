import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { QueryConfig } from 'src/app/models/query-config.model';
import { Query } from 'src/app/interfaces/query.interface';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { TableColumn } from 'src/app/models/table-column.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TableData } from 'src/app/interfaces/table-data.interface';
import { MatDialog } from '@angular/material/dialog';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';
import { RowPopupConfig } from 'src/app/models/row-popup-config.model';

@Component({
  selector: 'app-table-layout',
  templateUrl: './table-layout.component.html',
  styleUrls: ['./table-layout.component.scss']
})

export class TableLayoutComponent implements OnChanges {
  @Input() caption: string;
  @Input() data: TableData;
  @Input() columnConfig: TableColumn[];
  @Input() rowPopupConfig: RowPopupConfig;
  @Input() query: Query;
  @Input() queryConfig: QueryConfig;
  @Output() updatedQuery: EventEmitter<any> = new EventEmitter();
  
  queryForm: FormGroup;

  get displayedColumns() { return this.columnConfig.filter(x => x.isDisplayed) }
  get columnKeys() { return this.displayedColumns.map(x => x.key) };

  constructor(private fb: FormBuilder, public dialog: MatDialog, ) { }

  ngOnChanges() {
    if (this.query && !this.queryForm) {
      this.queryForm = this.fb.group({
        searchCriteria: '',
        search: { value: '', disabled: true },
        filter: null,
      });

      this.onChanges();
    }
  }

  onChanges(): void {
    this.onSearchCriteriaChange();
    this.onSearchInputChange();
    this.onFilterChange();
  }

  onSearchCriteriaChange(): void {
    this.getControl('searchCriteria').valueChanges.subscribe((criteria: string) => {
      if (criteria) {
        this.getControl('search').enable({ emitEvent: false });

        if(this.query.search) {
          this.query.search.attributes = [criteria];
          this.setPageToFirst();
          
          this.emitNewQuery();
        }else {
          this.query.search = {term: null, attributes: [criteria]}
        }
      } else {
        this.setPageToFirst();

        this.getControl('search').disable({ emitEvent: false });

        if (this.getControl('search').value) {
          this.getControl('search').setValue('', {emitEvent: false});
        };
        
        delete this.query.search
        this.emitNewQuery();
      }
    });
  };

  onSearchInputChange(): void {
    this.getControl('search').valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((searchInput) => {
      this.query.search.term = searchInput;
      this.setPageToFirst();
      this.emitNewQuery();
    });
  };

  onFilterChange(): void {
    this.getControl('filter').valueChanges.subscribe((filter:string) => {
      this.query.filters = [filter];
      this.setPageToFirst();
      this.emitNewQuery();
    });
  };

  onPageChange($event): void {
    if($event.pageSize !== this.query.page.size) {
      this.query.page = { size: $event.pageSize, number: 1 }
      this.emitNewQuery();
    }else {
      this.query.page = { size: $event.pageSize, number: $event.pageIndex + 1 }
      this.emitNewQuery();
    }
  }

  onSortChanges($event): void {
    this.query.sort = { by: $event.active, order: $event.direction };
    this.setPageToFirst();

    this.emitNewQuery();
  }

  emitNewQuery(): void {
    this.updatedQuery.emit(this.query);
  }

  getControl(name: string): AbstractControl {
    return this.queryForm.get(name);
  }

  setPageToFirst(): void {
    this.query.page = { size: this.query.page.size, number: 1 }
  }

  openRowDialog(data): void {
    this.dialog.open(PopupModalComponent, {
      data: {
        label: this.rowPopupConfig.label,
        text: data[this.rowPopupConfig.key]
      }
    })
  }
}
