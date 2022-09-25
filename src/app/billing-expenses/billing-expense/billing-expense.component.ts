import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BillingExpense } from 'src/app/invoices/invoice.model';
import { InvoiceService } from 'src/app/invoices/invoice.service';
import { LoadingService } from 'src/app/loading/loading.service';
import { ClearingItem } from 'src/app/shared/bill-item.model';
import { ClearingItemService } from 'src/app/shared/bill-item.service';
import { DialogService } from 'src/app/shared/dialog.service';
import { UtilityService } from 'src/app/shared/utility.service';
import { BillingExpenseListComponent } from '../billing-expense-list/billing-expense-list.component';
import { BillingExpenseService } from '../billing-expense.service';

@Component({
  selector: 'app-billing-expense',
  templateUrl: './billing-expense.component.html',
  styleUrls: ['./billing-expense.component.css'],
})
export class BillingExpenseComponent implements OnInit {
  isLoadingSubmit: boolean = false;

  constructor(
    public utilSvc: UtilityService,
    public service: BillingExpenseService,
    public invoiceService: InvoiceService,
    private itemService: ClearingItemService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<BillingExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(LOCALE_ID) public locale: string,
    public loadingService: LoadingService, // accessed from the template
    private dialogService: DialogService
  ) {}

  isValid: boolean = true;
  submitted: boolean = false;
  showSuccessMessage: boolean = false;
  public formControls = this.service.formData.controls;
  itemList: ClearingItem[] = []; //=this.customerGroupService.customerGroupList;
  // snoVal = this.service.formData.get('SNo')?.value;
  messages: any[] = [];
  billNoParam: string = '';
  JobCode: string = '';
  idx = 0;

  //curr = formatNumber(1000, this.locale, '7.1-5');

  ngOnInit() {
    //this.reloadData
    this.isLoadingSubmit = false;
    if (this.data.BillNo != null) {
      this.JobCode = this.data.JobCode;
      this.billNoParam = this.data.BillNo;
      this.service.formData.patchValue({
        BillNo: this.billNoParam,
        Total: 0, // this.data.balance.toFixed(2),
        BillStatus: this.data.billStatus,
        JobCode: this.JobCode,
        // dtDate: this.data.bDate,
      });
      this.utilSvc.setButtons(true);
      this.itemService
        .getListCombo()
        .then((res) => (this.itemList = res as ClearingItem[]));
    }
  }

  @ViewChild(BillingExpenseListComponent)
  childRef?: BillingExpenseListComponent;

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

      let duplicateArr: BillingExpense[] = [];
      const Importer = this.service.formData.controls['drgName'].value;
      duplicateArr = this.service.billingExpenseList.filter(
        (item) => item.drgName == Importer
      );

      // if (this.service.formData.controls['JobCode'].value == '') {
      //   this.service.formData.patchValue({ JobCode: '***' });

      // }

      if (duplicateArr.length > 0 && this.service.flgEdit == false) {
        this.toastr.warning('Duplicate Item Entry NOT Allowed');
        return;
      }

      // if (typeof this.service.formData.controls['drgName'].value == 'object') {
      //   // an array object
      //   if (this.service.formData.controls['drgName'].value[0] == null) {
      //     //ret an array with one value, null ie [null]
      //     this.toastr.warning('Select a Bill Item');
      //     return;
      //   }
      // }

      if (this.service.formData.controls['drgName'].value == '') {
        //ret an array with one value, null ie [null]
        this.toastr.warning('Select a Bill Item');
        return;
      }

      if (this.service.formData.controls['BillStatus'].value == '') {
        //ret an array with one value, null ie [null]
        this.toastr.warning('Select Entry For ( Invoice OR Expense)');
        return;
      }

      if (this.service.formData.controls['BillCategory'].value == '') {
        this.service.formData.patchValue({ BillCategory: '***' });
        // this.toastr.warning('Select a Bill Category');
        // return;
      }

      if (
        this.service.formData.controls['Qty'].value == '0' ||
        this.service.formData.controls['Qty'].value == ''
      ) {
        //this.toastr.warning('Specify Bill Type (Freight)');
        this.service.formData.patchValue({ Qty: 1 });
        // return;
      }

      if (
        this.service.formData.controls['Price'].value == '0' ||
        this.service.formData.controls['Price'].value == ''
      ) {
        this.toastr.warning('Specify Item Rate');
        //this.service.formData.patchValue({ Qty: 1 });
        return;
      }

      if (this.service.formData.controls['AmountPaid'].value == '') {
        //this.toastr.warning('Specify Bill Type (Freight)');
        this.service.formData.patchValue({ AmountPaid: 0 });
        // return;
      }

      if (this.service.formData.controls['Interest'].value == '') {
        //this.toastr.warning('Specify Bill Type (Freight)');
        this.service.formData.patchValue({ Interest: 0 });
        // return;
      }

      if (this.service.formData.controls['VAT'].value == '') {
        // this.toastr.warning('Specify VAT');
        //return;
        this.service.formData.patchValue({ VAT: 0 });
      }

      // if (this.service.formData.controls['BillStatus'].value != 'EXPENSE') {
      //   if (
      //     this.service.formData.controls['Serial'].value == '0' ||
      //     this.service.formData.controls['Serial'].value == ''
      //   ) {
      //     this.toastr.warning('Specify Serial');
      //     //this.service.formData.patchValue({ Qty: 1 });
      //     return;
      //   }
      // }

      if (this.service.formData.controls['Total'].value == '') {
        //this.toastr.warning('Specify Bill Type (Freight)');
        this.service.formData.patchValue({ Total: 0 });
        // return;
      }

      this.updateSubTotal(
        +this.service.formData.controls['Qty'].value,
        +this.service.formData.controls['Price'].value
      );

      const balance = this.updateTotal(
        +this.service.formData.controls['Qty'].value,
        +this.service.formData.controls['Price'].value,
        +this.service.formData.controls['VAT'].value,
        +this.service.formData.controls['AmountPaid'].value,
        +this.service.formData.controls['Interest'].value
      );
      // this.service.formData.controls['Total'].value.toFixed(2)
      // if (Number.isNaN(AmtPaid))

      this.service.formData.patchValue({ Total: balance });

      // if (!confirm('Do you want to save Bill Item')) return;
      this.dialogService
        .openConfirmDialog('Are you sure to save this record ?')
        .afterClosed()
        .subscribe((res) => {
          if (res) {
            //   this.loadingService.doLoading(
            //   this.itemService.getItems(),
            //   this
            // ).pipe(
            //   untilDestroyed(this),
            // ).subscribe(items => {
            //   this.items = items;
            // });

            this.isLoadingSubmit = true;

            if (this.service.flgEdit) {
              this.service
              .updateRecord(this.service.formData.value)
              .subscribe(
              // this.loadingService.doLoading(
              // this.service
              //   .insertRecord(this.service.formData.value) //,this,1)
              //   .subscribe(
                  (res) => {
                    this.resetForm();
                    this.notifyForm('update');
                    //this.dialogRef.close();
                    this.isLoadingSubmit = false;
                  },
                  (err) => {
                    // this.handleErrors(err);
                    this.toastr.error(err, 'Clearing');
                    this.isLoadingSubmit = false;
                  }
                );
            } else {
              //form.get('SNo')!.value == 0
              // this.loadingService.doLoading(
              this.service
                .insertRecord(this.service.formData.value) //,this,1)
                .subscribe(
                  (res) => {
                    this.resetForm();
                    this.notifyForm('insert');
                    this.isLoadingSubmit = false;
                  },
                  (err) => {
                    // this.handleErrors(err);
                    this.toastr.error(err, 'Clearing');
                    this.isLoadingSubmit = false;
                  }
                );
            }
          }
        });


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
    if (updateVal == 'insert')
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
      BillNo: this.billNoParam,
      JobCode: this.JobCode,
      dtDate: new Date(),
      // Total:this.invoiceService.balance.toFixed(2),
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

  @ViewChild(BillingExpenseListComponent)
  invListChildRef?: BillingExpenseListComponent;

  onClose() {
    this.service.formData.reset();
    this.service.clearFields();
    this.invoiceService.flgEdit = false;
    this.invoiceService.enableFields(false);
    if (this.invoiceService.form) this.invoiceService.form.reset();
    this.invoiceService.clearFields();
    this.utilSvc.setButtons(true);
    // this.invListChildRef?.reLoadData();
    // this.invoiceService.reLoadData();
    this.dialogRef.close();

    // this.invoiceService.updateTotal(this.billNoParam);
    // this.service.flgEdit = false;
    // this.service.enableFields(false);
    // this.utilSvc.setButtons(true);
    // this.service.formData.controls['billNO'].value
    // this.billNoParam = this.data.billNO;
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
    // console.log(ctrl)
    if (ctrl == null) {
      //.selectedIndex == 0
      this.idx = 0;
      this.service.formData.patchValue({
        MarkUp: 0,
        Serial: 0,
        BillCategory: '***',
        BillStatus: '***',
        FreightCat: '***',
      });
      //this.form.controls['your form control name'].value;
    } else {
      if (this.service.flgEdit) {
        //do nothing -- InvoiceDetailsList
      } else {
        //new entry
        if (this.itemList) {
          // this.idx = ctrl.selectedIndex;
          this.idx = this.itemList.findIndex((p) => p.BillItem == ctrl);
          this.idx += 1; //just to avoid editing below code lines
          this.service.formData.patchValue({
            // Interest: this.itemList[this.idx - 1].MarkUp
            //   ? this.itemList[this.idx - 1].MarkUp
            //   : 0,
            Serial: 0,
            BillCategory: this.itemList[this.idx - 1].BillCategory
              ? this.itemList[this.idx - 1].BillCategory
              : '',
            // BillStatus: this.itemList[this.idx - 1].BillStatus
            //   ? this.itemList[this.idx - 1].BillStatus
            //   : '',
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

  updateTotal(
    Qty: number,
    Price: number,
    VAT: number,
    AmtPaid: number,
    markUp: number
  ): number {
    this.service.PerformAddition();
    if (Number.isNaN(AmtPaid)) {
      AmtPaid = +this.service.formData.controls['AmountPaid'].value;
    }
    const amtPay = +AmtPaid;
    const subTot = Qty * Price;
    const pCentMargin = markUp / 100;
    const Interest = subTot * pCentMargin;
    const vatVal = VAT / 100;
    const VAT2 = (subTot - amtPay) * vatVal;
    const subTotal = subTot;
    const Total = subTot + Interest + VAT2; //--'AmtBilled   VAT is included for now
    const balance = Total - amtPay;
    return balance;
  }

  // updateTotal2() {
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


