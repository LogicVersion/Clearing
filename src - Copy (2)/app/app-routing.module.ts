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


const routes: Routes = [
  { path: 'billitems', component: ClearingItemsComponent },
  { path: 'consignees', component: ConsigneeComponent },
  { path: 'consigneegroups', component: ConsigneeGroupComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'home', component: HomeComponent },
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
