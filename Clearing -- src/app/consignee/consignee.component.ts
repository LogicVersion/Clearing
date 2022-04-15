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
export class ConsigneeComponent implements OnInit,AfterViewInit {
  constructor(
    public customerService: ConsigneeService,
    private customerGroupService: ConsigneeGroupService,
    private toastr: ToastrService
  ) {}
  submitted: boolean = false;
  showSuccessMessage: boolean = false;
  public formControls = this.customerService.form.controls;
  itemList: CustomerGroup[] = []; //=this.customerGroupService.customerGroupList;
  snoVal = this.customerService.form.get('SNo')?.value;

  ngOnInit() {
    //this.reloadData
    this.customerGroupService
      .getListCombo()
      .then((res) => (this.itemList = res as CustomerGroup[]));
  }

  @ViewChild(ConsigneeListComponent) childRef?: ConsigneeListComponent;

  ngAfterViewInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    if (this.customerService.form.valid) {
      if (this.customerService.form.get('SNo')!.value == 0) {
        this.customerService
          .insertRecord(this.customerService.form.value)
          .subscribe(
            (res) => {
              this.resetForm();
              this.notifyForm('insert');
            },
            (err) => {
              this.toastr.error(err.value, 'Clearing');
            }
          );
      } else {
        this.customerService
          .updateRecord(this.customerService.form.value)
          .subscribe((res) => {
            this.resetForm();
             this.notifyForm('update');
          },err=>{
            this.toastr.error(err.value,'Clearing');
          });
      }
    }
  }

  notifyForm(updateVal: string) {
    this.showSuccessMessage = true;
    setTimeout(() => (this.showSuccessMessage = false), 3000);
    this.submitted = false;
    if (updateVal='insert')
    this.toastr.success('Record saved successfully', 'Clearing');
    else
    this.toastr.success('Record updated successfully', 'Clearing');
    this.childRef?.reLoadData();

  }

  resetForm(){
     this.customerService.form.reset();
     //this is to be done for proper reset operation
     this.customerService.form.setValue({
       SNo: 0,
       ConsigneeCode: '',
       ConsigneeName: '',
       GroupName: '--Select--',
       ConsigneeAddress: '',
     });
   
  }


}

