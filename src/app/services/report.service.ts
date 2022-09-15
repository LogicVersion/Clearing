import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Report } from '../invoices/invoice.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  reportServer: string | null = environment.reportServer;
  srvURL: string = '';
  rptList: Report[] = [];

  constructor(private httpClient: HttpClient, private fb: FormBuilder) {}

  rptForm = this.fb.group({
    startDate: new Date(),
    endDate: new Date(),
    billNO: '',
    coyID: '(ALL***)',
    isLess: false,
  });

  clearFields() {
    this.rptForm.patchValue({
      startDate: this.formatStringToDate(new Date()),
      endDate: this.formatStringToDate(new Date()),
      billNO: '',
      coyID: '(ALL***)',
      isLess: false,
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

  getInvoice(invNo: string): Observable<any> {

    http: this.srvURL =
      this.reportServer + '/Invoice?invNo=' + invNo;

    console.clear();
    console.log(this.srvURL);

    return this.httpClient.get(this.srvURL, { responseType: 'blob' });
  }

  getClosedJobs(
    coyID: string,
    startDate: string,
    endDate: string,
    isLessDetls = false
  ): Observable<any> {

    // coyID,startDate,endDate,isLessDetls;

    // const queryParams = {
    //   'coyID': coyID,
    //   'startDate': startDate,
    //   'endDate': endDate,
    //   'isLessDetls': isLessDetls,
    // };

    const queryParams = new HttpParams()
      .append('coyID', coyID)
      .append('startDate', startDate)
      .append('endDate', endDate)
      .append('isLessDetls', isLessDetls);

    this.srvURL = this.reportServer + '/ClosedJob';

    console.clear();
    console.log(this.srvURL + '\n' + queryParams);

    return this.httpClient.get(this.srvURL, {
      params: queryParams,
      responseType: 'blob',
    });
  }

  // getSaving(): Observable<any> {
  //   this.srvURL =
  //     this.reportServer +
  //     '/VersatileandPrecise/FortifyFinancialAllinOneRetirementSavings';

  //   console.clear();
  //   console.log(this.srvURL);

  //   return this.httpClient.get(this.srvURL, { responseType: 'blob' });
  // }

  getFinancial(): Observable<any> {
    this.srvURL =
      this.reportServer + '/Financial/VarianceAnalysisReport';

    return this.httpClient.get(this.srvURL, { responseType: 'blob' });
  }
  getIncome(): Observable<any> {
    this.srvURL =
      this.reportServer +
      '/Demonstration/ComparativeIncomeStatement';

    return this.httpClient.get(this.srvURL, { responseType: 'blob' });
  }
}