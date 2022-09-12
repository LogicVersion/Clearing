import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ClearingItem} from './bill-item.model'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClearingItemService {
  //list: ClearingItem[] = [];
  //   {
  //     SNo:1,
  //     ClearingItem: 'TERMINAL CHARGES',
  //     markUp: 0,
  //     isActive: 'YES',
  //     Serial: 1,
  //     Amount: 5000,
  //     BillStatus: 'BOTH',
  //     BillCategory: 'TERMINAL',
  //     FreightCat: 'REGULAR',
  //   },
  //   {
  //     SNo: 2,
  //     ClearingItem: 'Shipping',
  //     markUp: 5,
  //     isActive: 'YES',
  //     Serial: 1,
  //     Amount: 8000,
  //     BillStatus: 'Expense',
  //     BillCategory: 'Clearing',
  //     FreightCat: 'REGULAR',
  //   },
  // ];

  list: ClearingItem[] = [];
  formData!: ClearingItem;
  readonly rootURL = environment.appURL + '/ClearingItems';
  corsHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:4200',
  });

  constructor(private http: HttpClient) {}

  postItem(formData: ClearingItem) {
    return this.http.post(this.rootURL, formData);
  }

  getListCombo() {
    return this.http.get(this.rootURL).toPromise();
    //.then((res) => (this.invoiceMasterArr = res as Invoice[]));
    //console.log(this.customerGroupList);
  }

  reloadList() {
    return this.http.get(this.rootURL); //, {headers: this.corsHeaders}
    // .subscribe((res) => (this.list = res as ClearingItem[]));
    // .toPromise()
    // .then((res) => (this.list = res as ClearingItem[]));
    //console.log(this.list);
  }

  putItem(formData: ClearingItem) {
    return this.http.put(this.rootURL + '/' + formData.SNo, formData);
  }

  deleteItem(id: number) {
    return this.http.delete(this.rootURL + '/' + id);
  }
}
