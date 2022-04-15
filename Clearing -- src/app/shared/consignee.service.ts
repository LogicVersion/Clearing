import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class ConsigneeService {
  constructor(private http: HttpClient) {}

  form = new FormGroup({
    //$key: new FormControl(null),
    //email: new FormControl('', Validators.email),
    SNo: new FormControl(0),
    ConsigneeCode: new FormControl('', [
      Validators.required,
      Validators.maxLength(5),
    ]),
    ConsigneeName: new FormControl('', Validators.required),
    GroupName: new FormControl('', Validators.required),
    ConsigneeAddress: new FormControl(''),
  });

  FormData(cust: Customer): void {
    //this.service.FormData = Object.assign({}, bItem);
    this.form.setValue({
      SNo: cust.SNo,
      ConsigneeCode: cust.ConsigneeCode,
      ConsigneeName: cust.ConsigneeName,
      GroupName: cust.GroupName,
      ConsigneeAddress: cust.ConsigneeAddress,
    });
  }

  customerList: Customer[] = [];

  readonly rootURL = environment.appURL + '/consignees';

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

  insertRecord(formData: Customer) {
    // console.log(formData);
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
    return this.http.put(this.rootURL + '/' + formData.ConsigneeCode, formData);
  }

  // updateCustomer(customer: ) {
  //   this.customerList.update(customer.$key, {
  //     fullName: customer.fullName,
  //     email: customer.email,
  //     mobile: customer.mobile,
  //     location: customer.location,
  //   });
  // }

  deleteRecord(id: string) {
    return this.http.delete(this.rootURL + '/' + id);
  }

  // deleteCustomer($key: string) {
  //   this.customerList.remove($key);
  // }
}
