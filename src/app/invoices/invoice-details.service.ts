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
import { Invoice, InvoiceDetails, InvoiceDetailsList } from './invoice.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceDetailsService {
  constructor(private http: HttpClient, private fb: FormBuilder) {}

  //form: Invoice = new Invoice();

  formData = this.fb.group({
    SNO: [0],
    PK_SNo: [0],
    dtDate: [new Date()],
    billNO: ['***', [Validators.required]],
    drgName: ['0', [Validators.required]],
    Price: [0, [Validators.required]],
    Qty: [0, [Validators.required]],
    subTotal: [0, [Validators.required]],
    Interest: [0],
    Total: [0],
    billType: ['***'],
    ExchRate: [1],
    Serial: [9],
    VatScope: ['0'],
    AmountPaid: [0],
    BillCategory: ['***'],
    BillStatus: ['***'],
    FreightCat: ['***'],
    FrightCat: [''],
  });

  FormData(inv: InvoiceDetails): void {
    //const bDate: Date = this.formatStringToDate(inv.bDate);
    //const bDate: Date = new Date("2011-09-24T00:00:00".replace(/-/g, '\/').replace(/T.+/, ''));

    this.formData.setValue({
      SNO: 0,
      PK_SNo: inv.PK_SNo,
      dtDate: this.formatStringToDate(inv.dtDate), // new Date( inv.bDate),
      billNO: inv.billNO,
      drgName: inv.drgName,
      Price: inv.Price,
      Qty: inv.Qty,
      subTotal: inv.subTotal,
      Interest: inv.Interest,
      //Total: inv.Total,
      billType: inv.billType,
      //VAT: inv.VAT,
      ExchRate: inv.ExchRate,
      Serial: inv.Serial,
      VatScope: inv.VatScope,
      AmountPaid: inv.AmountPaid,
      BillCategory: inv.BillCategory,
      BillStatus: inv.BillStatus,
      FreightCat: inv.FreightCat,
      FrightCat: inv.FrightCat,
    });
  }

  clearFields() {
    this.formData.patchValue({
      SNO: 0,
      PK_SNo: 0,
      dtDate: this.formatStringToDate(new Date()),
      billNO: '***',
      drgName: '0',
      Price: 0,
      Qty: 0,
      subTotal: 0,
      Interest: 0,
      //Total: 0,
      billType: '***',
      VAT: 0,
      ExchRate: 1,
      Serial: 9,
      VatScope: '0',
      AmountPaid: 0,
      BillCategory: '***',
      BillStatus: '***',
      FreightCat: '***',
      FrightCat: '',
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
      // this.form.controls['SNo'].enable();
      // this.formData.controls['ConsigneeCode'].enable();
      // this.formData.controls['ConsigneeName'].enable();
      // this.formData.controls['GroupName'].enable();
      // this.formData.controls['ConsigneeAddress'].enable();

      // if (this.flgEdit) {
      //   this.formData.controls['ConsigneeCode'].disable();
      //}
    } else {
      this.formData.disable();
      // this.formData.controls['SNo'].disable();
      // this.formData.controls['ConsigneeCode'].disable();
      // this.formData.controls['ConsigneeName'].disable();
      // this.formData.controls['GroupName'].disable();
      // this.formData.controls['ConsigneeAddress'].disable();
    }

    //  this.formData.setValue({
    //   SNo: { value: '', disabled: true },
    //   //ConsigneeCode: { value: '', disabled: blnVal },
    //   ConsigneeCode: { value: '', disabled: blnVal },
    //   ConsigneeName: { value: '', disabled: blnVal },
    //   GroupName: { value: '', disabled: blnVal },
    //   ConsigneeAddress: { value: '', disabled: blnVal },
    // });
  }

  // password: ['', [Validators.minLength(6), this.isAddMode ? Validators.required : Validators.nullValidator]],
  //             confirmPassword: ['', this.isAddMode ? Validators.required : Validators.nullValidator]

  InvoiceDetailsList: InvoiceDetailsList[] = [];
  invoiceMasterArr: Invoice[] = [];
  invoiceDetailsArr: InvoiceDetails[] = [];

  updateTotal() {
    if (this.InvoiceDetailsList.length > 0) {
      this.formData.patchValue({
        Total: this.InvoiceDetailsList.reduce((sum, curr) => {
          return sum + curr.subTotal; //sum=prev Value
        }, 0),
        //this.service.formData.GTotal = parseFloat(this.service.formData.GTotal.toFixed(2));
      });
    } else {
      this.formData.patchValue({
        Total: 0,
      });
    }
  }

  readonly appURL = environment.appURL + '/invoicedetails';
  //readonly appURL ='http://localhost:8081/api/invoices'

  // getListCombo() {
  //   return this.http.get(this.appURL).toPromise();
  //   //.then((res) => (this.invoiceMasterArr = res as Invoice[]));
  //   //console.log(this.customerGroupList);
  // }

  getList(billNoX: string) {
    return this.http.get(this.appURL + '/' + billNoX);
    // this.http.get(this.appURL);
    // .toPromise()
    // .then((res) => (this.InvoiceList = res as Invoice[]));
    // console.log(this.InvoiceList);

    // return this.http.get({headers: new httpHeaders({
    // 'content-type: 'application/json',
    // 'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
    // }) })
  }

  // getListFirebase() {
  //   this.employeeList = this.firebase.list('employees');
  //   return this.employeeList.snapshotChanges();
  // }

  insertRecord(formVal: InvoiceDetails): Observable<InvoiceDetails> {
    const dtDate = this.formatDateToString(formVal.dtDate);
    formVal.dtDate = dtDate;

    // console.log(formVal);
    //let body = JSON.stringify({ formVal });
    //let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // let headers = new HttpHeaders({
    //   'Access-Control-Allow-Origin': '*',
    //   'content-type': 'application/json',
    // });
    // console.log(headers);
    //let options = new RequestOptions ({ headers: headers });
    let body = JSON.stringify(formVal);

    // let headers = new HttpHeaders({
    //   'Access-Control-Allow-Origin': '*',
    //   'content-type': 'application/json',
    // });

    //console.log(headers);
    //let options = { headers };
    // let options = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //     //Authorization: 'Bearer ' + localStorage.getItem('userToken'),
    //   }),
    // };
    //return this.http.post(this.appURL, body, options);
    //'https://localhost:7118/api/invoices'

    return this.http
      .post<InvoiceDetails>(this.appURL, body, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError((error) => this.handleError(error))); //this.handleError(error)
  }

  handleError(error: any) {
    // console.log('Caught in CatchError. Throwing error')
    // throw new Error(error)  //js syntax
    //return throwError(() => new error(error.messages || 'server error'))
    return throwError(() => console.log(error));
  }

  // insertInvoice(Invoice) {
  //   this.InvoiceList.push({
  //     fullName: Invoice.fullName,
  //     email: Invoice.email,
  //     mobile: Invoice.mobile,
  //     location: Invoice.location,
  //   });
  // }

  updateRecord(formVal: InvoiceDetails) {
    let body = JSON.stringify(formVal);
    return this.http
      .put(this.appURL + '/' + formVal.PK_SNo, body, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError((error) => this.handleError(error))); //this.handleError(error));
  }

  deleteRecord(id: number) {
    return this.http.delete(this.appURL + '/' + id);
  }

  // updateInvoice(Invoice: ) {
  //   this.InvoiceList.update(Invoice.$key, {
  //     fullName: Invoice.fullName,
  //     email: Invoice.email,
  //     mobile: Invoice.mobile,
  //     location: Invoice.location,
  //   });
  // }

  // deleteInvoice($key: string) {
  //   this.InvoiceList.remove($key);
  // }
}


