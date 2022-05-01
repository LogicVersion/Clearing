import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer.model';
import { Invoice, InvoiceDetails, InvoiceList } from './invoice.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private http: HttpClient, private fb: FormBuilder) {}

  //form: Invoice = new Invoice();

  form = this.fb.group({
    ID: [0],
    bDate: [new Date(), [Validators.required]],
    billNO: ['***', [Validators.required]],
    JobCode: ['', [Validators.required]],
    billType: ['0', [Validators.required]],
    JobNature: ['0', [Validators.required]],
    pNo: ['0', [Validators.required]],
    ConsigneeCode: ['', [Validators.required]],
    AmountBilledInWord: ['', [Validators.required]],
    IssuedBy: ['', [Validators.required]],
    GoodsDescription: ['', [Validators.required]],
    BLNo: ['', [Validators.required]],
    CheckedBy: ['', [Validators.required]],
    Carrier: ['', [Validators.required]],
    Weight: [''],
    JobStartDate: [new Date(), [Validators.required]],
    JobEndDate: [new Date(), [Validators.required]],
    NoOf20Ft: [0, [Validators.required]],
    NoOf40Ft: [0, [Validators.required]],
    Content: ['', [Validators.required]],
    Voy: ['', [Validators.required]],
    clientID: [''],
    AmountBilled: [0],
    profFee: [0],
    AmtBF: [0],
    AmountPaid: [0],
    BillingMonth: [''],
    BillingYear: [0],
    diagnosis: [''],
    isPaid: [false],
    CoyFullName: [''],
    CoyAddress: [''],
    PORder: [''],
    JPCNo: [''],
    Curr: [''],
    Address: [''],
    consultDate: [new Date()],
  });

  flgEdit = false;
  key: string = '';
  billNoVal: string = '';
  bDateVal: Date = new Date();

  enableFields(blnVal = true) {
    if (blnVal) {
      this.form.enable();
      // this.form.controls['SNo'].enable();
      // this.form.controls['ConsigneeCode'].enable();
      // this.form.controls['ConsigneeName'].enable();
      // this.form.controls['GroupName'].enable();
      // this.form.controls['ConsigneeAddress'].enable();

      // if (this.flgEdit) {
      //   this.form.controls['ConsigneeCode'].disable();
      //}
    } else {
      this.form.disable();
      // this.form.controls['SNo'].disable();
      // this.form.controls['ConsigneeCode'].disable();
      // this.form.controls['ConsigneeName'].disable();
      // this.form.controls['GroupName'].disable();
      // this.form.controls['ConsigneeAddress'].disable();
    }

    //  this.form.setValue({
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

  clearFields() {
    this.form.patchValue({
      ID: [0],
      bDate: [new Date().toISOString().substr(0, 10)],
      billNO: ['***'],
      JobCode: [''],
      billType: ['0'],
      JobNature: ['0'],
      pNo: ['0'],
      ConsigneeCode: [''],
      AmountBilledInWord: [''],
      IssuedBy: [''],
      GoodsDescription: [''],
      BLNo: [''],
      CheckedBy: [''],
      Carrier: [''],
      Weight: [''],
      JobStartDate: [new Date()],
      JobEndDate: [new Date()],
      NoOf20Ft: [0],
      NoOf40Ft: [0],
      Content: [''],
      Voy: [''],
    });
  }

  formatDateToString(dateVal: Date): any {
    return dateVal.toISOString(); //.toISOString().substr(0
  }

  formatStringToDate(dateVal: any): Date {
    const d = new Date(dateVal);
    const dayNum: number = d.getDate() + 1; //+ ('0' + inv.bDate.getDate()).slice(-2);
    const mthNum: number = d.getMonth(); //+ ('0' + (inv.bDate.getMonth() + 1)).slice(-2);
    const yrNum: number = d.getFullYear();
    return new Date(yrNum, mthNum, dayNum);
  }

  FormData(inv: Invoice): void {
    //const bDate: Date = this.formatStringToDate(inv.bDate);
    //const bDate: Date = new Date("2011-09-24T00:00:00".replace(/-/g, '\/').replace(/T.+/, ''));

    this.form.setValue({
      ID: 0, //inv.ID,
      bDate: this.formatStringToDate(inv.bDate), // new Date( inv.bDate),
      billNO: inv.billNO,
      JobCode: inv.JobCode,
      billType: inv.billType,
      JobNature: inv.JobNature,
      pNo: inv.pNo,
      ConsigneeCode: inv.ConsigneeCode,
      AmountBilledInWord: inv.AmountBilledInWord,
      IssuedBy: inv.IssuedBy,
      GoodsDescription: inv.GoodsDescription,
      BLNo: inv.BLNo,
      CheckedBy: inv.CheckedBy,
      Carrier: inv.Carrier,
      Weight: '', //inv.Weight,
      JobStartDate: this.formatStringToDate(inv.JobStartDate),
      JobEndDate: this.formatStringToDate(inv.JobEndDate),
      NoOf20Ft: inv.NoOf20Ft,
      NoOf40Ft: inv.NoOf40Ft,
      Content: inv.Content,
      Voy: inv.Voy,
    });
  }

  invoiceList: InvoiceList[] = [];
  invoiceMasterArr: Invoice[] = [];
  invoiceDetailsArr: InvoiceDetails[] = [];

  readonly appURL = environment.appURL + '/invoices';
  //readonly appURL ='http://localhost:8081/api/invoices'

  // getListCombo() {
  //   return this.http.get(this.appURL).toPromise();
  //   //.then((res) => (this.invoiceMasterArr = res as Invoice[]));
  //   //console.log(this.customerGroupList);
  // }

  getList() {
    return this.http.get(this.appURL);
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

  insertRecord(formData: Invoice): Observable<Invoice> {
    const clientID = formData.pNo;
    const bDate = this.formatDateToString(formData.bDate);
    const JobStartDate = this.formatDateToString(formData.JobStartDate);
    const JobEndDate = this.formatDateToString(formData.JobEndDate);

    formData.clientID=clientID;
    formData.bDate = bDate;
    formData.JobStartDate = JobStartDate;
    formData.JobEndDate = JobEndDate;

    // console.log(formData);
    //let body = JSON.stringify({ formData });
    //let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // let headers = new HttpHeaders({
    //   'Access-Control-Allow-Origin': '*',
    //   'content-type': 'application/json',
    // });
    // console.log(headers);
    //let options = new RequestOptions ({ headers: headers });
    let body = JSON.stringify(formData);

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
      .post<Invoice>('https://localhost:7118/api/invoices', body, {
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

  updateRecord(formData: Invoice) {
    return this.http.put(this.appURL + '/' + formData.ConsigneeCode, formData);
  }

  deleteRecord(id: string) {
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
