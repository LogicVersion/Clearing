import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {  observable, Observable, throwError } from 'rxjs'; //catchError,
import { retry, catchError } from 'rxjs/operators';
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
    ID: 0,
    bDate: [new Date(), [Validators.required]],
    billNO: ['***', [Validators.required]],
    JobCode: ['', [Validators.required]],
    billType: ['0', [Validators.required]],
    JobNature: ['0', [Validators.required]],
    pNo: [null, [Validators.required]],
    ConsigneeCode: ['', [Validators.required]],
    AmountBilledInWord: [''],
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
    AmountBilled: 0,
    profFee: 0,
    AmtBF: 0,
    AmountPaid: 0,
    Balance: 0,
    BillingMonth: [''],
    BillingYear: 0,
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
  billStatus: string = '';

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
      ID: 0,
      bDate: this.formatStringToDate(new Date()),
      billNO: ['***'],
      JobCode: [''],
      billType: ['0'],
      JobNature: ['0'],
      pNo: [null],
      ConsigneeCode: [''],
      AmountBilledInWord: [''],
      AmountBilled: 0,
      AmountPaid: 0,
      Balance: 0,
      IssuedBy: [''],
      GoodsDescription: [''],
      BLNo: [''],
      CheckedBy: [''],
      Carrier: [''],
      Weight: [''],
      JobStartDate: this.formatStringToDate(new Date()),
      JobEndDate: this.formatStringToDate(new Date()),
      NoOf20Ft: 0,
      NoOf40Ft: 0,
      Content: [''], // CoyFullName
      CoyFullName: [''], //
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

  amountBal: number = 0;

  FormData(inv: Invoice): void {
    //const bDate: Date = this.formatStringToDate(inv.bDate);
    //const bDate: Date = new Date("2011-09-24T00:00:00".replace(/-/g, '\/').replace(/T.+/, ''));

    this.amountBal = inv.AmountBilled - inv.AmountPaid;
    this.balance = this.amountBal;

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
      clientID: '',
      AmountBilled: inv.AmountBilled,
      profFee: 0,
      AmtBF: 0,
      AmountPaid: inv.AmountPaid,
      Balance: this.balance.toFixed(2), //(inv.AmountBilled - inv.AmountPaid),
      BillingMonth: '',
      BillingYear: 0,
      diagnosis: '',
      isPaid: false,
      CoyFullName: inv.CoyFullName,
      CoyAddress: '',
      PORder: '',
      JPCNo: '',
      Curr: '',
      Address: '',
      consultDate: new Date(),
    });
  }

  invoiceList: Invoice[] = []; //InvoiceList[] = [];
  invoiceMasterArr: Invoice[] = [];
  invoiceDetailsArr: InvoiceDetails[] = [];

  readonly appURL = environment.appURL + '/invoices';
  //readonly appURL ='http://localhost:8081/api/invoices'

  invoiceByIdList: any; //InvoiceList[]
  AmtBilled: any = 0;
  AmtPaid: any = 0;
  balance: any = 0;
  AmtBilledInWord: string = '';

  updateTotal(billNO: string) {
    // this.form.patchValue({ Balance: 0 });
    this.AmtBilled = 0;
    this.AmtPaid = 0;
    this.balance = 0;
    this.AmtBilledInWord = '';
    if (true) {
      this.getListByID(billNO).subscribe((res) => {
        this.invoiceByIdList = res as Invoice[];
        this.AmtBilledInWord = this.invoiceByIdList['AmountBilledInWord'];
        this.AmtBilled = this.invoiceByIdList['AmountBilled'];
        this.AmtPaid = this.invoiceByIdList['AmountPaid'];
        this.balance = (this.AmtBilled - this.AmtPaid).toFixed(2);
        this.form.patchValue({
          AmountBilled: this.AmtBilled,
          AmountPaid: this.AmtPaid,
          Balance: this.balance,
          AmountBilledInWord: this.AmtBilledInWord,
        });
      });

      //   this.invoiceService
      //     .getListByID(billNO)
      //     .then((res) => {
      //       (this.invoiceService.invoiceByIdList = res as Invoice[])
      //       const arr=this.invoiceService.invoiceByIdList
      //       const AmtBilled=this.invoiceService.invoiceByIdList[0].AmountBilled;
      //       const AmtPaid = this.invoiceService.invoiceByIdList[0].AmountPaid;
      //       const balance=(AmtBilled-AmtPaid).toFixed(2)
      //       this.formData.patchValue({
      //       Total: balance});
      //     }, (error)=>{
      //   console.log("Promise rejected with " + JSON.stringify(error));
      // })

      //console.log(this.invoiceService.invoiceByIdList);
      //  console.log(this.invoiceService.invoiceByIdList)

      // this.InvoiceDetailsList.reduce((sum, curr) => {
      //   return sum + curr.Total; //sum=prev Value
      // }, 0),
      //this.service.formData.GTotal = parseFloat(this.service.formData.GTotal.toFixed(2));
      // });
    } else {
      this.form.patchValue({ Balance: 0 });
    }
  }

  getListByID(id: string) {
    return this.http.get(this.appURL + '/' + id);
    // .toPromise();
    // .then((res) => (this.invoiceByIdList = res as Invoice[]));
    // console.log(this.invoiceByIdList);
  }

  getList() {
    return this.http.get(this.appURL);
    //.pipe(retry(1), catchError(this.handleError));

    // this.http.get(this.appURL);
    // .toPromise()
    // .then((res) => (this.InvoiceList = res as Invoice[]));
    // console.log(this.InvoiceList);

    // return this.http.get({headers: new httpHeaders({
    // 'content-type: 'application/json',
    // 'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
    // }) })
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>;
  //@ViewChild(MatTable) table!: MatTable<DatatableItem>;
  //dataSource: DatatableDataSource;
  //dataSource= this.service.customerList; //this.service.customerList; //ELEMENT_DATA;
  dataSource!: MatTableDataSource<any>; // new MatTableDataSource(this.dataSource);
  searchKey?: string;

  getSearchList(strVal: string) {
    const searchURL = `${this.appURL}/search/${strVal}`;
    return this.http.get(searchURL);
  }

  reLoadDataSearch(str: string): void {
    this.invoiceList = [];
    this.getSearchList(str).subscribe((res) => {
      this.invoiceList = res as Invoice[];
      this.dataSource = new MatTableDataSource(this.invoiceList); //ELEMENT_DATA;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  reLoadData(): void {
    this.getList().subscribe((res) => {
      this.invoiceList = res as Invoice[];
      this.dataSource = new MatTableDataSource(this.invoiceList); //ELEMENT_DATA;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  // handleError(error: any) {
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // client-side error
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   console.log(errorMessage);
  //   return throwError(() => {
  //     return errorMessage;
  //   });
  // }

  // getListFirebase() {
  //   this.employeeList = this.firebase.list('employees');
  //   return this.employeeList.snapshotChanges();
  // }

  // getListCombo() {
  //   return this.http.get(this.appURL).toPromise();
  //   //.then((res) => (this.invoiceMasterArr = res as Invoice[]));
  //   //console.log(this.customerGroupList);
  // }

  insertRecord(formData: Invoice): Observable<Invoice> {
    const clientID = formData.pNo;
    const bDate = this.formatDateToString(formData.bDate);
    const JobStartDate = this.formatDateToString(formData.JobStartDate);
    const JobEndDate = this.formatDateToString(formData.JobEndDate);

    formData.clientID = clientID;
    formData.bDate = bDate;
    formData.JobStartDate = JobStartDate;
    formData.JobEndDate = JobEndDate;
    formData.CoyFullName = formData.ConsigneeCode;
    formData.profFee = 0;
    formData.AmtBF = 0;
    formData.NoOf20Ft = +formData.NoOf20Ft;
    formData.NoOf40Ft = +formData.NoOf40Ft;

    formData.AmountBilledInWord = '';
    formData.billNO = '***';
    formData.Weight = '';
    formData.consultDate = bDate;

    // delete formData.Balance;
    // assign the key regex to the variable _ indicating it will be unused
    const { Balance: _, ...formDataNew } = formData;

    // console.log(formData);
    //let body = JSON.stringify({ formData });
    //let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // let headers = new HttpHeaders({
    //   'Access-Control-Allow-Origin': '*',
    //   'content-type': 'application/json',
    // });
    // console.log(headers);
    //let options = new RequestOptions ({ headers: headers });
    let body = JSON.stringify(formDataNew);

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

    console.clear();
    console.log(formDataNew);
    console.log(body);

    return this.http.post<Invoice>(this.appURL, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
    // .pipe(catchError((error) => this.handleError(error))); //this.handleError(error)
  }

  handleError2(error: any) {
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
    formData.CoyFullName = formData.ConsigneeCode;
    formData.consultDate = formData.bDate;

    const { Balance: _, ...formDataEdit } = formData;
    // delete formData.Balance;

    let body = JSON.stringify(formDataEdit);

    console.clear();
    console.log(formDataEdit);
    console.log(body);

    return this.http.put(this.appURL + '/' + formData.billNO, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
    // .pipe(catchError((error) => this.handleError(error))); //this.handleError(error));
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
