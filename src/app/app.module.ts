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
import { UtilityService } from './shared/utility.service';
import { InvoiceComponent } from './invoices/invoice/invoice.component';
import { InvoiceListComponent } from './invoices/invoice-list/invoice-list.component';
import { InvoiceDetailsComponent } from './invoices/invoice-details/invoice-details.component';
import { DateFormatPipe } from './shared/date-format.pipe';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { DateInputConverterDirective } from './shared/date-input-converter.directive';
import { InvoiceDetailsListComponent } from './invoices/invoice-details-list/invoice-details-list.component';
import {InvoiceDetailsService } from './invoices/invoice-details.service';
import {InvoiceService,} from './invoices/invoice.service';
import { FormatNumerLocalDirective } from './shared/format-numer-local.directive';
import { DataEntryComponent } from './data-entry/data-entry.component';
import { ReportsComponent } from './reports/reports.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ProductsAndServicesComponent } from './products-and-services/products-and-services.component';
//import { AppRoutingAdminModule, routeComponentsAdmin } from './app-routing-admin.module';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { AuthMainGuard } from './auth-main.guard';
import { UserService } from './auth/shared/user.service';

import { AppResolve } from './_resolvers/app.resolver';

import { NgSelectModule } from '@ng-select/ng-select';
import { ErrorInterceptor } from './shared/error.interceptor';
import { ValidateEqualModule } from 'ng-validate-equal';
import { PasswordPatternDirective } from './directives/password-pattern.directive';
import { MatchPasswordDirective } from './directives/match-password.directive';
import { ValidateUserNameDirective } from './directives/validate-user-name.directive';

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
    InvoiceComponent,
    InvoiceListComponent,
    InvoiceDetailsListComponent,
    InvoiceDetailsComponent,
    DateFormatPipe,
    DateInputConverterDirective,
    FormatNumerLocalDirective,
    DataEntryComponent,
    ReportsComponent,
    ContactUsComponent,
    ProductsAndServicesComponent,
    PasswordPatternDirective,
    MatchPasswordDirective,
    ValidateUserNameDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    BsDatepickerModule.forRoot(),
    AuthModule,
    AppRoutingModule,
    NgSelectModule,
    ValidateEqualModule,
  ],
  providers: [
    ClearingItemService,
    ConsigneeService,
    ConsigneeGroupService,
    { provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    UtilityService,
    InvoiceService,
    InvoiceDetailsService,
    AuthGuard,
    AuthMainGuard,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AppResolve,
  ],
  entryComponents: [InvoiceDetailsComponent, InvoiceDetailsListComponent],
  bootstrap: [AppComponent, LoadingService],
  exports: [FormatNumerLocalDirective],
})
export class AppModule {}
