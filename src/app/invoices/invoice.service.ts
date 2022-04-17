import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer.model';
import { Invoice } from './invoice.model';

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
    pNo: ['', [Validators.required]],
    AmountBilledInWord: ['', [Validators.required]],
    IssuedBy: ['', [Validators.required]],
    GoodsDescription: ['', [Validators.required]],
    BLNo: ['', [Validators.required]],
    CheckedBy: ['', [Validators.required]],
    Carrier: ['', [Validators.required]],
    Weight: [0, [Validators.required]],
    JobStartDate: [new Date(), [Validators.required]],
    JobEndDate: [new Date(), [Validators.required]],
    NoOf20Ft: [0, [Validators.required]],
    NoOf40Ft: [0, [Validators.required]],
    Content: ['', [Validators.required]],
    Voy: ['', [Validators.required]],
  });

  flgEdit = false;
  key: string = '';

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

    // this.form.setValue({
    //   SNo: 0,
    //   ConsigneeCode: '',
    //   ConsigneeName: '',
    //   GroupName: '--Select--',
    //   ConsigneeAddress: '',
    // });
  }

  FormData(cust: Invoice): void {
    //this.service.FormData = Object.assign({}, bItem);
    this.form.setValue({
      ID: [0],
      bDate: [new Date()],
      billNO: ['***'],
      JobCode: [''],
      billType: [''],
      JobNature: [''],
      pNo: [''],
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

  invoiceList: Invoice[] = [];

  readonly rootURL = environment.appURL + '/consignees';

  getList() {
    return this.http.get(this.rootURL);
    // this.http.get(this.rootURL);
    // .toPromise()
    // .then((res) => (this.InvoiceList = res as Invoice[]));
    // console.log(this.InvoiceList);
  }

  // getListFirebase() {
  //   this.employeeList = this.firebase.list('employees');
  //   return this.employeeList.snapshotChanges();
  // }

  insertRecord(formData: Invoice) {
    // console.log(formData);
    return this.http.post(this.rootURL, formData);
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
    return this.http.put(this.rootURL + '/' + formData.ConsigneeCode, formData);
  }

  deleteRecord(id: string) {
    return this.http.delete(this.rootURL + '/' + id);
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
