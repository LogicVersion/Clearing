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
import { Invoice, InvoiceDetails, InvoiceList } from './invoice.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private http: HttpClient, private fb: FormBuilder) {}

  //form: Invoice = new Invoice();

  form = this.fb.group({
    ID: [0],
    bDate: [new Date().toISOString().substr(0, 10), [Validators.required]],
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

  FormData(inv: Invoice): void {
    this.form.setValue({
      ID: 0, //inv.ID,
      bDate: inv.bDate.toISOString().substr(0, 10), //.toISOString().substr(0, 10)
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
      JobStartDate: inv.JobStartDate,
      JobEndDate: inv.JobEndDate,
      NoOf20Ft: inv.NoOf20Ft,
      NoOf40Ft: inv.NoOf40Ft,
      Content: inv.Content,
      Voy: inv.Voy,
    });
  }

  invoiceList: InvoiceList[] = [];
  invoiceMasterArr: Invoice[] = [];
  invoiceDetailsArr: InvoiceDetails[] = [];

  readonly appURL = environment.appURL + '/billings';

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
  }

  // getListFirebase() {
  //   this.employeeList = this.firebase.list('employees');
  //   return this.employeeList.snapshotChanges();
  // }

  insertRecord(formData: Invoice) {
    // console.log(formData);
    return this.http.post(this.appURL, formData);
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
