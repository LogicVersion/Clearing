import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer.model';
import { ClearingItem } from '../shared/bill-item.model';
import { ClearingItemService } from '../shared/bill-item.service';
import { ConsigneeService } from '../shared/consignee.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  imgHome = environment.imgHome;
  imgHomeLogo = environment.imgHomeLogo;
  itemList: Customer[] = []; //=this.customerGroupService.customerGroupList;

  constructor(private customerService: ConsigneeService) {}

  ngOnInit(): void {
    this.customerService
      .getListCombo()
      .then((res) => (this.itemList = res as Customer[]));
  }
}
