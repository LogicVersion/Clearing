import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { ConsigneeService } from '../shared/consignee.service';
import { FormGroup } from '@angular/forms';
import { ConsigneeGroupService } from '../shared/consignee-group.service';
import { CustomerGroup } from '../models/customer.model';
import { ToastrService } from 'ngx-toastr';
import { ConsigneeListComponent } from './consignee-list/consignee-list.component';
//import { CustomerGroup } from 'src - Copy/app/models/customer.model';
@Component({
  selector: 'app-consignee',
  templateUrl: './consignee.component.html',
  styleUrls: ['./consignee.component.css'],
})
export class ConsigneeComponent implements OnInit, AfterViewInit {
  constructor(
    public service: ConsigneeService,
    private customerGroupService: ConsigneeGroupService,
    private toastr: ToastrService
  ) {}
  submitted: boolean = false;
  showSuccessMessage: boolean = false;
  public formControls = this.service.form.controls;
  itemList: CustomerGroup[] = []; //=this.customerGroupService.customerGroupList;
  snoVal = this.service.form.get('SNo')?.value;
  messages: any[] = [];

  ngOnInit() {
    //this.reloadData
    this.customerGroupService
      .getListCombo()
      .then((res) => (this.itemList = res as CustomerGroup[]));
  }

  @ViewChild(ConsigneeListComponent) childRef?: ConsigneeListComponent;

  ngAfterViewInit(): void {}

  onSubmit() {
    this.submitted = true;
    if (this.service.form.valid) {
      if (this.service.form.get('SNo')!.value == 0) {
        this.service.insertRecord(this.service.form.value).subscribe(
          (res) => {
            this.resetForm();
            this.notifyForm('insert');
          },
          (err) => {
            this.handleErrors(err);
            this.toastr.error(err, 'Clearing');
          }
        );
      } else {
        this.service.updateRecord(this.service.form.value).subscribe(
          (res) => {
            this.resetForm();
            this.notifyForm('update');

          },
          (err) => {
             this.handleErrors(err);
             this.toastr.error(err, 'Clearing');
          }
        );
      }
    }
  }

  private handleErrors(errors: any) {
    this.messages = [];
    for (let msg of errors) {
      this.messages.push(msg);
    }
    console.log(this.messages);
  }

  notifyForm(updateVal: string) {
    this.showSuccessMessage = true;
    setTimeout(() => (this.showSuccessMessage = false), 3000);
    this.submitted = false;
    if ((updateVal = 'insert'))
      this.toastr.success('Record saved successfully', 'Clearing');
    else  this.toastr.success('Record updated successfully', 'Clearing');
          this.service.setButtons (true)
          this.service.enableFields(false);
          this.service.flgEdit = false;
          this.childRef?.reLoadData();
  }

  resetForm() {
    if (this.service.form) this.service.form.reset();
    //this is to be done for proper reset operation
    this.service.form.setValue({
      SNo: 0,
      ConsigneeCode: '',
      ConsigneeName: '',
      GroupName: '--Select--',
      ConsigneeAddress: '',
    });
    this.service.flgEdit = false;

  }

  cancelEntry() {
    this.service.flgEdit =false;
    this.service.setButtons (true);
    this.service.enableFields(false);
    this.resetForm();

  }

  addNew() {
    this.service.flgEdit = false;
    this.service.setButtons(false);
    this.service.enableFields(true);
  }
}

