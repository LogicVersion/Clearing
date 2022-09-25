import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer.model';
import {
  // Invoice,
  // InvoiceDetails,
  // InvoiceDetailsList,
  // InvoiceList,
  BillingExpense,
} from '../invoices/invoice.model';
import { InvoiceService } from '../invoices/invoice.service';


@Injectable({
  providedIn: 'root',
})
export class BillingExpenseService {
  constructor(
    private http: HttpClient,
    private invoiceService: InvoiceService,
    private fb: FormBuilder
  ) {}

  formData = this.fb.group({
    JobCode: ['', [Validators.required]],
    SNO: 0,
    dtDate: [new Date(), [Validators.required]],
    BillNo: ['***', [Validators.required]],
    drgName: ['', [Validators.required]],
    Price: 0,
    Qty: 1,
    subTotal: [0, [Validators.required]],
    VAT: 0, //.toFixed(2),
    Interest: 0, //.toFixed(2),
    Total: 0,
    billType: '',
    ExchRate: 1,
    Serial: 0,
    VatScope: '',
    AmountPaid: 0,
    BillCategory: '',
    BillStatus: ['', [Validators.required]],
  });

  FormData(inv: BillingExpense): void {
    this.formData.patchValue({
      JobCode: inv.JobCode,
      SNO: inv.SNO,
      dtDate: this.formatStringToDate(inv.dtDate), // new Date( inv.bDate),
      BillNo: inv.BillNo,
      drgName: inv.drgName,
      Price: +inv.Price,
      Qty: +inv.Qty,
      subTotal: +inv.subTotal,
      VAT: +((inv.VAT / (inv.subTotal - inv.AmountPaid)) * 100), //.toFixed(2),
      Interest: +((inv.Interest / inv.subTotal) * 100), //.toFixed(2),
      Total: +inv.Total,
      billType: inv.billType,
      ExchRate: inv.ExchRate,
      Serial: +inv.Serial,
      VatScope: inv.VatScope,
      AmountPaid: +inv.AmountPaid,
      BillCategory: inv.BillCategory,
      BillStatus: inv.BillStatus,
    });
  }

  clearFields() {
    this.formData.patchValue({
      // JobCode: '',
      SNO: 0,
      dtDate: new Date(),
      // BillNo: '***',
      drgName: '',
      Price: 0,
      Qty: 0,
      subTotal: 0,
      VAT: 0, //.toFixed(2),
      Interest: 0, //.toFixed(2),
      Total: 0,
      billType: '',
      ExchRate: 1,
      Serial: 0,
      VatScope: '',
      AmountPaid: 0,
      BillCategory: '',
      BillStatus: 'EXPENSE',
    });
  }

  formatDateToString(dateVal: Date): any {
    try {
      return dateVal.toISOString(); //.toISOString().substr(0
    } catch (err) {
      return dateVal; //
    }
  }

  formatStringToDate(dateVal: any): Date {
    try {
      const d = new Date(dateVal);
      const dayNum: number = d.getDate() + 1; //+ ('0' + inv.bDate.getDate()).slice(-2);
      const mthNum: number = d.getMonth(); //+ ('0' + (inv.bDate.getMonth() + 1)).slice(-2);
      const yrNum: number = d.getFullYear();
      return new Date(yrNum, mthNum, dayNum);
    } catch (err) {
      return dateVal; //
    }
  }

  flgEdit = false;
  key: number = 0;
  billNoVal: string = '';
  bDateVal: Date = new Date();

  enableFields(blnVal = true) {
    if (blnVal) {
      this.formData.enable();
    } else {
      this.formData.disable();
    }
  }

  billingExpenseList: BillingExpense[] = [];
  // invoiceMasterArr: Invoice[] = [];
  billingExpenseArr: BillingExpense[] = [];

  PerformAddition() {
    // on blur
    let results = 0;
    const valuesString: string = this.formData.controls['Price'].value;
    if (typeof valuesString != 'number') {
      if (valuesString.indexOf('+')) {
        var valuesStr = valuesString.split('+'); //split based on ' ' and store on a variable
        const valuesArray = valuesStr.map((x) => parseFloat(x)); //convert each item to int
        //perform your computation
        results = valuesArray.reduce((sum, curr) => {
          return (sum += curr);
        }, 0);
      } else {
        results = +this.formData.controls['Price'].value;
      }
    } else {
      results = +this.formData.controls['Price'].value;
    }

    this.formData.patchValue({
      Price: results.toFixed(2),
    });
  }

  readonly appURL = environment.appURL + '/billingexpenses';

  getList(billNoX: string) {
    return this.http.get(this.appURL + '/' + billNoX);
  }

  insertRecord(formVal: BillingExpense): Observable<BillingExpense> {
    const dtDate = this.formatDateToString(formVal.dtDate);
    formVal.dtDate = dtDate;

    formVal.Qty = +formVal.Qty;
    formVal.Price = +formVal.Price;
    formVal.VAT = +formVal.VAT;
    // formVal.Total = 0; //done in sproc  //+formVal.Total;

    formVal.AmountPaid = +formVal.AmountPaid;
    formVal.Interest = +formVal.Interest;
    formVal.Serial = +formVal.Serial;

    // const formValX: BillingExpense[] = [];
    // formValX.push(formVal);

    let body = JSON.stringify(formVal);

    console.clear();
    console.log(formVal);
    console.log(body); //json

    return this.http.post<BillingExpense>(this.appURL, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  updateRecord(formVal: BillingExpense) {
    //  updateRecord fn is NOT used! only insert
    let body = JSON.stringify(formVal);
    console.clear();
    console.log(formVal);
    console.log(body); //json
    return this.http.put(this.appURL + '/' + formVal.SNO, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
    // .pipe(catchError((error) => this.handleError(error))); //this.handleError(error));
  }

  deleteRecord(id: number) {
    return this.http.delete(this.appURL + '/' + id);
  }
}


