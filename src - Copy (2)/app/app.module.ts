import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routeComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ClearingItemService } from './shared/bill-item.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ConsigneeListComponent } from './consignee/consignee-list/consignee-list.component';
import { ConsigneeService } from './shared/consignee.service';
import { ConsigneeComponent } from './consignee/consignee.component';
import { ConsigneeGroupService } from './shared/consignee-group.service';
import { LoadingService } from './shared/loading.service';
import { MaterialModule } from './material/material.module';
import { ConsigneeGroupComponent } from './consignee/consignee-group/consignee-group.component';
import { ConsigneeGroupListComponent } from './consignee/consignee-group-list/consignee-group-list.component';
import { NetworkInterceptor } from './shared/network.interceptor';
import { DatatableComponent } from './datatable/datatable.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DisabledDirective } from './disabled.directive';






@NgModule({
  declarations: [
    AppComponent,
    routeComponents,
    WelcomeComponent,
    PageNotFoundComponent,
    ConsigneeListComponent,
    ConsigneeComponent,
    ConsigneeGroupComponent,
    ConsigneeGroupListComponent,
    DatatableComponent,
    DisabledDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [
    ClearingItemService,
    ConsigneeService,
    ConsigneeGroupService,
    { provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi: true },
  ],
  bootstrap: [AppComponent, LoadingService],
})
export class AppModule {}
