import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
    billType: ['', [Validators.required]],
    JobNature: ['', [Validators.required]],
    pNo: ['0', [Validators.required]],
    ConsigneeCode: ['', [Validators.required]],
    AmountBilledInWord: ['', [Validators.required]],
    IssuedBy: ['', [Validators.required]],
    GoodsDescription: ['', [Validators.required]],
    BLNo: ['', [Validators.required]],
    CheckedBy: ['', [Validators.required]],
    Carrier: ['', [Validators.required]],
    Weight: [0], //[Validators.required]],
    JobStartDate: [new Date(), [Validators.required]],
    JobEndDate: [new Date(), [Validators.required]],
    NoOf20Ft: [0, [Validators.required]],
    NoOf40Ft: [0, [Validators.required]],
    Content: ['', [Validators.required]],
    Voy: ['', [Validators.required]],
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
    this.form.setValue({
      ID: [0],
      bDate: [new Date().toISOString().substr(0, 10)],
      billNO: ['***'],
      JobCode: [''],
      billType: [''],
      JobNature: [''],
      pNo: ['0'],
      ConsigneeCode: [''],
      AmountBilledInWord: [''],
      IssuedBy: [''],
      GoodsDescription: [''],
      BLNo: [''],
      CheckedBy: [''],
      Carrier: [''],
      Weight: [0],
      JobStartDate: [new Date()],
      JobEndDate: [new Date()],
      NoOf20Ft: [0],
      NoOf40Ft: [0],
      Content: [''],
      Voy: [''],
    });
  }

  formatDate(dateVal: any) : Date{
     const d = new Date(dateVal);
     const dayNum: number = d.getDate() + 1; //+ ('0' + inv.bDate.getDate()).slice(-2);
     const mthNum: number = d.getMonth(); //+ ('0' + (inv.bDate.getMonth() + 1)).slice(-2);
     const yrNum: number = d.getFullYear();
    return new Date(yrNum, mthNum, dayNum);
    }

  FormData(inv: Invoice): void {

  //const bDate: Date = this.formatDate(inv.bDate);
  //const bDate: Date = new Date("2011-09-24T00:00:00".replace(/-/g, '\/').replace(/T.+/, ''));

    this.form.setValue({
      ID: 0, //inv.ID,
      bDate: this.formatDate(inv.bDate), // new Date( inv.bDate),
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
      Weight: 0, //inv.Weight,
      JobStartDate: this.formatDate(inv.JobStartDate),
      JobEndDate: this.formatDate(inv.JobEndDate),
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
  //readonly appURL ='https://localhost:7118/api/billings'

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

  insertRecord(formData: Invoice) {
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
    
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'content-type': 'application/json'} )
    
    
      console.log(headers)
    let options = { headers };
    // let options = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //     //Authorization: 'Bearer ' + localStorage.getItem('userToken'),
    //   }),
    // };
    //return this.http.post(this.appURL, body, options);
    return this.http.post(this.appURL, formData, options);
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
