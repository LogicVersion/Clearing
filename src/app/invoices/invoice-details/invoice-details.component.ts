import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Inject,
} from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { FormArray, FormGroup } from '@angular/forms';
import { ConsigneeService } from '../../shared/consignee.service';
import { Customer } from '../../models/customer.model';
import { ToastrService } from 'ngx-toastr';
import { InvoiceListComponent } from '../invoice-list/invoice-list.component';
import { UtilityService } from '../../shared/utility.service';
import { Invoice } from '../invoice.model';
import { ClearingItemService } from 'src/app/shared/bill-item.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClearingItem } from 'src/app/shared/bill-item.model';
import { InvoiceDetailsService } from '../invoice-details.service';
import { InvoiceDetailsListComponent } from '../invoice-details-list/invoice-details-list.component';

import { formatNumber } from '@angular/common';
import {LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css'],
})
export class InvoiceDetailsComponent implements OnInit {
  constructor(
    public utilSvc: UtilityService,
    public service: InvoiceDetailsService,
    private itemService: ClearingItemService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<InvoiceDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(LOCALE_ID) public locale: string
  ) {}

  isValid: boolean = true;
  submitted: boolean = false;
  showSuccessMessage: boolean = false;
  public formControls = this.service.formData.controls;
  itemList: ClearingItem[] = []; //=this.customerGroupService.customerGroupList;
  // snoVal = this.service.formData.get('SNo')?.value;
  messages: any[] = [];
  billNoParam: string = '';
  idx = 0;

  //curr = formatNumber(1000, this.locale, '7.1-5');

  ngOnInit() {
    //this.reloadData
    if (this.data.billNO != null) {
      this.billNoParam = this.data.billNO;
      this.service.formData.patchValue({ billNO: this.billNoParam });
      this.utilSvc.setButtons(true);
      this.itemService
        .getListCombo()
        .then((res) => (this.itemList = res as ClearingItem[]));
    }
  }

  @ViewChild(InvoiceDetailsListComponent)
  childRef?: InvoiceDetailsListComponent;

  ngAfterViewInit(): void {
    this.utilSvc.setButtons(true);
    //this.updateTotal();

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
    if (this.service.formData.valid) {
      // console.log(this.findInvalidControlsRecursive(this.service.formData));
      // if ( this.findInvalidControls(this.service.formData) !=null) {
      //console.log(this.service.flgEdit);
      if (this.service.flgEdit) {
        this.service.updateRecord(this.service.formData.value).subscribe(
          (res) => {
            this.resetForm();
            this.notifyForm('update');
            //this.dialogRef.close();
          },
          (err) => {
            this.handleErrors(err);
            this.toastr.error(err, 'Clearing');
          }
        );
      } else {
        //form.get('SNo')!.value == 0
        this.service.insertRecord(this.service.formData.value).subscribe(
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
      this.toastr.success('Record saved successfully', 'Invoice-Item Saved');
    else this.toastr.success('Record updated successfully', 'Clearing Updated');
    //this.utilSvc.setButtons(true);
    //this.service.enableFields(false);
    this.service.flgEdit = false;
    this.childRef?.reLoadData();
    //this.service.updateTotal();

  }

  resetForm() {
    if (this.service.formData.valid) this.service.formData.reset();

    //this.service.formData= new Invoice();
    this.service.flgEdit = false;
    this.service.clearFields();
    //this.ngOnInit();
    this.service.formData.patchValue({
      billNO: this.billNoParam,
      dtDate: new Date(),
    });

    ////this is to be done for proper reset operation
    // this.service.formData.setValue({
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

  onClose() {
    this.service.formData.reset();
    this.service.clearFields();
    this.dialogRef.close();
  }

  addToGrid() {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = '70%';
    // dialogConfig.height = '70%';
    // this.dialog.open(InvoiceDetailsComponent, dialogConfig);
  }

  updateFields(ctrl: any) {
    if (ctrl.selectedIndex == 0) {
      this.idx = 0;
      this.service.formData.patchValue({
        MarkUp: 0,
        Serial: 9,
        BillCategory: '***',
        BillStatus: '***',
        FreightCat: '***',
      });
      //this.form.controls['your form control name'].value;
    } else {
      if (this.service.flgEdit) {
        //do nothing -- InvoiceDetailsList
        // this.service.formData.patchValue({
        //   Interest:
        //     this.service.InvoiceDetailsList[ctrl.selectedIndex - 1].Interest,
        //   Serial:
        //     this.service.InvoiceDetailsList[ctrl.selectedIndex - 1].Serial,
        //   BillCategory:
        //     this.service.InvoiceDetailsList[ctrl.selectedIndex - 1]
        //       .BillCategory,
        //   BillStatus:
        //     this.service.InvoiceDetailsList[ctrl.selectedIndex - 1]
        //       .BillStatus,
        //   FreightCat:
        //     this.service.InvoiceDetailsList[ctrl.selectedIndex - 1].FreightCat,
        // });
      } else {
        //new entry
        if (this.itemList) {
          this.idx = ctrl.selectedIndex;
          this.service.formData.patchValue({
            Interest: this.itemList[this.idx - 1].MarkUp
              ? this.itemList[this.idx - 1].MarkUp
              : 0,
            Serial: this.itemList[this.idx - 1].Serial
              ? this.itemList[this.idx - 1].Serial
              : 9,
            BillCategory: this.itemList[this.idx - 1].BillCategory
              ? this.itemList[this.idx - 1].BillCategory
              : '***',
            BillStatus: this.itemList[this.idx - 1].BillStatus
              ? this.itemList[this.idx - 1].BillStatus
              : '***',
            FreightCat: this.itemList[this.idx - 1].FreightCat
              ? this.itemList[this.idx - 1].FreightCat
              : '***',
          });
        }
      }
    }
  }

  updateSubTotal(qty: number, price: number) {
    if (qty == 0 || price == 0) {
      this.service.formData.patchValue({
        subTotal: 0,
        //Total: 0,
      });
    } else {
      this.service.formData.patchValue({
        subTotal: qty * price,
      });
      //this.service.updateTotal();
    }
  }

  // updateTotal() {
  //   if (this.service.InvoiceDetailsList.length > 0){
  //     this.service.formData.patchValue({
  //       Total: this.service.InvoiceDetailsList.reduce((sum, curr) => {
  //         return sum + curr.subTotal; //sum=prev Value
  //       }, 0),
  //       //this.service.formData.GTotal = parseFloat(this.service.formData.GTotal.toFixed(2));
  //     });
  //   } else {
  //     this.service.formData.patchValue({
  //       Total:0,
  //     });
  //   }

  // }

  // updateTotal2() {
  //   this.formData.Total = parseFloat(
  //     (this.formData.Quantity * this.formData.Price).toFixed(2)
  //   );
  // }

  // isNumberKey(evt: any) {
  //   var charCode = evt.which ? evt.which : event.keyCode;
  //   if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;

  //   return true;
  // }
}


