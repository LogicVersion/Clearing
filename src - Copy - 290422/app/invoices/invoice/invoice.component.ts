import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import {FormArray, FormGroup } from '@angular/forms';
import { ConsigneeService } from '../../shared/consignee.service';
import { Customer } from '../../models/customer.model';
import { ToastrService } from 'ngx-toastr';
import { InvoiceListComponent } from '../invoice-list/invoice-list.component';
import { UtilityService } from '../../shared/utility.service';
import { Invoice } from '../invoice.model';
import { MatDialog ,MatDialogConfig} from '@angular/material/dialog';
import { InvoiceDetailsComponent } from '../invoice-details/invoice-details.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  constructor(
    public utilSvc: UtilityService,
    public service: InvoiceService,
    private customerService: ConsigneeService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}
  submitted: boolean = false;
  showSuccessMessage: boolean = false;
  public formControls = this.service.form.controls;
  itemList: Customer[] = []; //=this.customerGroupService.customerGroupList;
  // snoVal = this.service.form.get('SNo')?.value;
  messages: any[] = [];

  //bDate =  this.service.form.controls['bDate'];
  //bDateVal = new Date('2022-04-22'); // this.service.form.controls['bDate'];
  today: String = ''; //<- note String
  date: Date = new Date();

  // // today: String=''; //<- note String
  // // date: Date = new Date();
  //  today: Date = new Date(); // Date = new Date();
  // dateStr: String = ''; //String=''; //<- note String

  ngOnInit() {
    //this.reloadData
    this.today = this.date.toISOString().substr(0, 10);
    //this.today = new Date().toLocaleDateString();
    // console.log(today)

    // this.today =
    //   this.date.getFullYear() +
    //   '-' +
    //   (this.date.getMonth() + 1) +
    //   '-' +
    //   this.date.getDate();
    // console.log(today)
    // // output 2021-7-9

    this.utilSvc.setButtons(true);
    this.customerService
      .getListCombo()
      .then((res) => (this.itemList = res as Customer[]));
  }

  @ViewChild(InvoiceListComponent) childRef?: InvoiceListComponent;

  ngAfterViewInit(): void {
    this.utilSvc.setButtons(true);
  }

  /*
   Returns an array of invalid control/group names, or a zero-length array if
   no invalid controls/groups where found
*/
  public findInvalidControlsRecursive(frm: FormGroup | FormArray): string[] {
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

  private handleErrors(errors: any) {
    // this.messages = [];
    // for (let msg of errors) {
    //   this.messages.push(msg);
    // }
    // console.log(this.messages);
    console.log(errors);
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

    //this.service.form= new Invoice();
    this.service.flgEdit = false;
    this.service.clearFields();
    ////this is to be done for proper reset operation
    // this.service.form.setValue({
    //   ID: [0],
    //   bDate: [new Date()],
    //   billNO: ['***'],
    //   JobCode: [''],
    //   billType: [''],
    //   JobNature: [''],
    //   pNo: [''],
    //   ConsigneeCode: [''],
    //   AmountBilledInWord: [''],
    //   IssuedBy: [''],
    //   GoodsDescription: [''],
    //   BLNo: [''],
    //   CheckedBy: [''],
    //   Carrier: [''],
    //   Weight: [0],
    //   JobStartDate: [new Date()],
    //   JobEndDate: [new Date()],
    //   NoOf20Ft: [0],
    //   NoOf40Ft: [0],
    //   Content: [''],
    //   Voy: [''],
    // });
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
  AddToBill() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.height = '70%';
    dialogConfig.data = {
      billNO: this.service.billNoVal,
      bDate: this.service.bDateVal,
    };
    this.dialog.open(InvoiceDetailsComponent, dialogConfig);
  }
}


