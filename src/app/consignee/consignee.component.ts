import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { ConsigneeService } from '../shared/consignee.service';
import { FormArray, FormGroup } from '@angular/forms';
import { ConsigneeGroupService } from '../shared/consignee-group.service';
import { CustomerGroup } from '../models/customer.model';
import { ToastrService } from 'ngx-toastr';
import { ConsigneeListComponent } from './consignee-list/consignee-list.component';
import { UtilityService } from '../shared/utility.service';
//import { CustomerGroup } from 'src - Copy/app/models/customer.model';
@Component({
  selector: 'app-consignee',
  templateUrl: './consignee.component.html',
  styleUrls: ['./consignee.component.css'],
})
export class ConsigneeComponent implements OnInit, AfterViewInit {
  constructor(
    public utilSvc: UtilityService,
    public service: ConsigneeService,
    private customerGroupService: ConsigneeGroupService,
    private toastr: ToastrService
  ) {}
  submitted: boolean = false;
  showSuccessMessage: boolean = false;
  public formControls = this.service.form.controls;
  itemList: CustomerGroup[] = []; //=this.customerGroupService.customerGroupList;
  // snoVal = this.service.form.get('SNo')?.value;
  messages: any[] = [];

  ngOnInit() {
    //this.reloadData
    this.customerGroupService
      .getListCombo()
      .then((res) => (this.itemList = res as CustomerGroup[]));
  }

  @ViewChild(ConsigneeListComponent) childRef?: ConsigneeListComponent;

  ngAfterViewInit(): void {
    this.utilSvc.setButtons(true);
  }

  /*
   Returns an array of invalid control/group names, or a zero-length array if
   no invalid controls/groups where found
*/
  public findInvalidControlsRecursive(
    frm: FormGroup | FormArray
  ): string[] {
    var invalidControls: string[] = [];
    let recursiveFunc = (form: FormGroup | FormArray) => {
      Object.keys(form.controls).forEach((field) => {
        const control = form.get(field);
        if (control?.invalid) invalidControls.push(field);
        if (control instanceof FormGroup) {
          recursiveFunc(control);
        } else if (control instanceof FormArray) {
          recursiveFunc(control);
        }
      });
    };
    recursiveFunc(frm);
    return invalidControls;
  }

  public findInvalidControls(frm: FormGroup) {
    const invalidCtrlX = [];
    const controls = frm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalidCtrlX.push(name);
      }
    }
    return invalidCtrlX;
  }

  onSubmit() {
    this.submitted = true;
    if (this.service.form.valid) {
      // console.log(this.findInvalidControlsRecursive(this.service.form));
      // if ( this.findInvalidControls(this.service.form) !=null) {
      //console.log(this.service.flgEdit);
      if (this.service.flgEdit) {
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
      } else {
        //form.get('SNo')!.value == 0
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
      }
    }
  }

  private handleErrors              (errors: any) {
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
      this.toastr.success('Record saved successfully', 'Clearing Saved');
    else this.toastr.success('Record updated successfully', 'Clearing Updated');
    this.utilSvc.setButtons(true);
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
    this.service.flgEdit = false;
    this.utilSvc.setButtons(true);
    this.service.enableFields(false);
    this.resetForm();
  }

  addNew() {
    this.service.flgEdit = false;
    this.utilSvc.setButtons(false);
    this.service.enableFields(true);
  }
}

