import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
export class ReportsComponent implements OnInit, AfterViewInit {
  imgHome = environment.imgHome;
  imgHomeLogo = environment.imgHomeLogo;
  itemList: Customer[] = []; //=this.customerGroupService.customerGroupList;

  constructor(
    private customerService: ConsigneeService,
    public service: ReportService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.customerService
      .getListCombo()
      .then((res) => (this.itemList = res as Customer[]));

    this.service.clearFields;
  }
  pdfSource: any;

  public visible = false;

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.visible = true;
    });
  }

  displyInvoice(invNo: string) {
    if (this.service.rptForm.controls['billNO'].value == '') {
      this.toastr.warning('Specify Invoice No');
      return;
    }

    this.service.getInvoice(invNo).subscribe((data) => {
      this.pdfSource = data;
    });
  }

  displayClosedJobs(isLessDetls: boolean) {
    if (this.service.rptForm.controls['coyID'].value == '') {
      this.toastr.warning('Specify Client Name');
      return;
    }

    const coyID = this.service.rptForm.controls['coyID'].value;
    const startDate = this.service.rptForm.controls['startDate'].value;
    const endDate = this.service.rptForm.controls['endDate'].value;
    // const isLessDetls = this.service.rptForm.controls['isLessDetls'].value;

    const dtStartStr = this.service.formatDateToString(startDate);
    const dtEndStr = this.service.formatDateToString(endDate);

    this.service
      .getClosedJobs(coyID, dtStartStr, dtEndStr, isLessDetls)
      .subscribe((data) => {
        this.pdfSource = data;
      });
  }


}
