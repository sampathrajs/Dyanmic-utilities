import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgProgressModule, NgProgressInterceptor } from 'ngx-progressbar';
import { HttpService } from './service/http.service';
import { NotificationService } from './service/notification.service';
import { NotificationComponent } from './notification/notification.component';
import { BreadcrumbService } from './service/breadcrumb.service';
import { DynamicroutesService } from './service/dynamicroutes.service';
import { WebStorageModule } from 'ngx-store';
import { SessionService } from './service/session.service';
import { DataTablesModule } from 'angular-datatables';
import { DatasTableComponent } from './datas-table/datas-table.component';

@NgModule({  
  imports: [
    CommonModule,
    HttpClientModule,
    NgProgressModule,
    WebStorageModule,
    DataTablesModule
  ],
  exports: [
    NgProgressModule,
    NotificationComponent,
    DatasTableComponent
  ],
  providers: [
    HttpService,
    NotificationService,
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true },
    BreadcrumbService,
    DynamicroutesService,
    SessionService
  ],
  declarations: [
    NotificationComponent,
    DatasTableComponent
  ]  
})
export class AppCommonModule { }
