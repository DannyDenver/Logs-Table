import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TableLayoutComponent } from './core/table-layout/table-layout.component';
import { HttpClientModule } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PopupModalComponent } from './core/popup-modal/popup-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SpinnerComponent } from './core/spinner/spinner.component';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ErrorLogsComponent } from './components/error-logs/error-logs.component';
import { RequestLogsComponent } from './components/request-logs/request-logs.component';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    TableLayoutComponent,
    PopupModalComponent,
    SpinnerComponent,
    ErrorLogsComponent,
    RequestLogsComponent
    ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    HttpClientModule,
    MatSelectModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatButtonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [DatePipe],
  entryComponents: [PopupModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
