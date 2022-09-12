import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class ConsigneeService {
  constructor(private http: HttpClient, private fb: FormBuilder) {}

  form = this.fb.group({
    //$key: []null),
    //email: [''], Validators.email),
    SNo: 0,
    ConsigneeCode: ['', [Validators.required, Validators.maxLength(5)]],
    ConsigneeName: ['', [Validators.required]],
    GroupName: ['0', [Validators.required]],
    ConsigneeAddress: [''],
    isSpecial: false,
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
    this.form.setValue({
      SNo: 0,
      ConsigneeCode: '',
      ConsigneeName: '',
      GroupName: '0',
      ConsigneeAddress: '',
      isSpecial: false,
    });
  }

  FormData(cust: Customer): void {
    //this.service.FormData = Object.assign({}, bItem);
    this.form.setValue({
      SNo: cust.SNo,
      ConsigneeCode: cust.ConsigneeCode,
      ConsigneeName: cust.ConsigneeName,
      GroupName: cust.GroupName,
      ConsigneeAddress: cust.ConsigneeAddress,
      isSpecial: cust.isSpecial,
    });
  }

  customerList: Customer[] = [];

  readonly rootURL = environment.appURL + '/consignees';

  getListCombo() {
    return this.http.get(this.rootURL).toPromise();
    // .then((res) => (this.customerGroupListCombo = res as CustomerGroup[]));
    //console.log(this.customerGroupList);
  }

  getList() {
    return this.http.get(this.rootURL);
    // this.http.get(this.rootURL);
    // .toPromise()
    // .then((res) => (this.customerList = res as Customer[]));
    // console.log(this.customerList);
  }

  // getListFirebase() {
  //   this.employeeList = this.firebase.list('employees');
  //   return this.employeeList.snapshotChanges();
  // }


   isSpecial: boolean=false;

  insertRecord(formData: Customer) {
    // console.log(formData);
    formData.isSpecial=this.isSpecial;

    const formData2=JSON.stringify(formData);

    return this.http.post(this.rootURL, formData);
  }

  // insertCustomer(customer) {
  //   this.customerList.push({
  //     fullName: customer.fullName,
  //     email: customer.email,
  //     mobile: customer.mobile,
  //     location: customer.location,
  //   });
  // }

  updateRecord(formData: Customer) {

   formData.isSpecial = this.isSpecial;

   const formData2 = JSON.stringify(formData);

    return this.http.put(this.rootURL + '/' + formData.ConsigneeCode, formData);
  }

  deleteRecord(id: string) {
    return this.http.delete(this.rootURL + '/' + id);
  }

  // updateCustomer(customer: ) {
  //   this.customerList.update(customer.$key, {
  //     fullName: customer.fullName,
  //     email: customer.email,
  //     mobile: customer.mobile,
  //     location: customer.location,
  //   });
  // }

  // deleteCustomer($key: string) {
  //   this.customerList.remove($key);
  // }
}
