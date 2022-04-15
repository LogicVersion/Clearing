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

  customerList: Customer[] = [];
  readonly rootURL = environment.appURL + '/consignee';

  form = new FormGroup({
    //$key: new FormControl(null),
    //email: new FormControl('', Validators.email),
    SNo: new FormControl(null),
    ConsigneeCode: new FormControl('', [
      Validators.required,
      Validators.maxLength(5),
    ]),
    ConsigneeName: new FormControl('', Validators.required),
    GroupName: new FormControl('', Validators.required),
    ConsigneeAddress: new FormControl(''),
  });

  getCustomers() {
    this.http
      .get(this.rootURL)
      .toPromise()
      .then((res) => (this.customerList = res as Customer[]));
    //console.log(this.list);
  }

  insertCustomer(formData: Customer) {
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

  populateForm(customer: FormGroup) {
    this.form.setValue(customer);
  }

  updateCustomer(formData: Customer) {
    return this.http.put(this.rootURL + '/' + formData.SNo, formData);
  }

  // updateCustomer(customer: ) {
  //   this.customerList.update(customer.$key, {
  //     fullName: customer.fullName,
  //     email: customer.email,
  //     mobile: customer.mobile,
  //     location: customer.location,
  //   });
  // }

  deleteCustomer(id: number) {
    return this.http.delete(this.rootURL + '/' + id);
  }

  // deleteCustomer($key: string) {
  //   this.customerList.remove($key);
  // }
}
