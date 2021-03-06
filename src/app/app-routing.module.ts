import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClearingItemsComponent } from './bill-items/bill-items.component';
import { ClearingItemListComponent } from './bill-items/bill-item-list/bill-item-list.component';
import { ClearingItemComponent } from './bill-items/bill-item/bill-item.component';
import { ConsigneeComponent } from './consignee/consignee.component';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ConsigneeGroupComponent } from './consignee/consignee-group/consignee-group.component';
import { InvoiceComponent } from './invoices/invoice/invoice.component';
import { DataEntryComponent } from './data-entry/data-entry.component';
import { ReportsComponent } from './reports/reports.component';
import { ProductsAndServicesComponent } from './products-and-services/products-and-services.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AuthMainGuard } from './auth-main.guard';

//import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//import { ToastrModule } from 'ngx-toastr';
//import { HomeComponent } from './home/home.component';
//import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AdminPanelComponent } from './auth/admin-panel/admin-panel.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'ProductsAndServices', component: ProductsAndServicesComponent },
  { path: 'ContactUs', component: ContactUsComponent },
  {
    path: 'DataEntry',
    component: DataEntryComponent,
    canActivate: [AuthMainGuard],
    children: [
      { path: 'billitems', component: ClearingItemsComponent },
      { path: 'consignees', component: ConsigneeComponent },
      { path: 'consigneegroups', component: ConsigneeGroupComponent },
      { path: 'welcome', component: WelcomeComponent },
      { path: 'invoices', component: InvoiceComponent }, //invoices
      { path: '', component: InvoiceComponent }, //invoices
    ],
  },
  {
    path: 'Reports',
    component: ReportsComponent,
    canActivate: [AuthMainGuard],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routeComponents = [
  ClearingItemsComponent,
  ClearingItemListComponent,
  ClearingItemComponent,
  ConsigneeComponent,
  HomeComponent,
  WelcomeComponent,
  PageNotFoundComponent,
];
