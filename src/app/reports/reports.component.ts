import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer.model';
import { ReportService } from '../services/report.service';
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

  constructor(
    private customerService: ConsigneeService,
    public service: ReportService
  ) {}

  ngOnInit(): void {
    this.customerService
      .getListCombo()
      .then((res) => (this.itemList = res as Customer[]));

    this.service.clearFields;
  }
  pdfSource: any;

  displyInvoice(invNo: string) {
    this.service.getInvoice(invNo).subscribe((data) => {
      this.pdfSource = data;
    });
  }
}
