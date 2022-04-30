import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { CustomerGroup } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class ConsigneeGroupService {
  constructor(private http: HttpClient) {}

  customerGroupList: CustomerGroup[] = [];
  customerGroupListCombo: CustomerGroup[] = [];
  readonly rootURL = environment.appURL + '/consigneegroups';

  form = new FormGroup({
    ID: new FormControl(null),
    GroupName: new FormControl('', Validators.required),
  });
  FormData(cust: CustomerGroup): void {
    //this.service.FormData = Object.assign({}, bItem);
    this.form.setValue({
      ID: cust.ID,
      GroupName: cust.GroupName,
    });
  }

  getList() {
    return this.http.get(this.rootURL);

    // this.http
    //   .get(this.rootURL)
    //   .toPromise()
    //   .then((res) => (this.customerGroupList = res as CustomerGroup[]));
    //console.log(this.list);
  }
  getListCombo() {
   return this.http
      .get(this.rootURL)
      .toPromise();
      // .then((res) => (this.customerGroupListCombo = res as CustomerGroup[]));
    //console.log(this.customerGroupList);
  }

  insertRecord(formData: CustomerGroup) {
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

  populateForm(CustomerGroup: FormGroup) {
    this.form.setValue(CustomerGroup);
  }

  updateRecord(formData: CustomerGroup) {
    return this.http.put(this.rootURL + '/' + formData.ID, formData);
  }

  // updateCustomer(customer: ) {
  //   this.customerList.update(customer.$key, {
  //     fullName: customer.fullName,
  //     email: customer.email,
  //     mobile: customer.mobile,
  //     location: customer.location,
  //   });
  // }

  deleteRecord(id: number) {
    return this.http.delete(this.rootURL + '/' + id);
  }

  // deleteCustomer($key: string) {
  //   this.customerList.remove($key);
  // }
}
