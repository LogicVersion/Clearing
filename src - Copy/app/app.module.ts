import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routeComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ClearingItemService } from './shared/bill-item.service';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ConsigneeListComponent } from './consignee/consignee-list/consignee-list.component';
import { ConsigneeService } from './shared/consignee.service';
import { ConsigneeComponent } from './consignee/consignee.component';
import { ConsigneeGroupService } from './shared/consignee-group.service';




@NgModule({
  declarations: [
    AppComponent,
    routeComponents,
    WelcomeComponent,
    PageNotFoundComponent,
    ConsigneeListComponent,
    ConsigneeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ClearingItemService, ConsigneeService, ConsigneeGroupService],
  bootstrap: [AppComponent],
})
export class AppModule {}
