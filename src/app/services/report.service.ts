import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    coyID: null,
    isLess: false,
  });

  clearFields() {
    this.rptForm.patchValue({
      startDate: this.formatStringToDate(new Date()),
      endDate: this.formatStringToDate(new Date()),
      billNO: '',
      coyID: null,
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
    //localhost:8095/api/Reports/Invoice?billNo=000002544
    //  /api/Reports/ClosedJob
    // /api/Reoprst / Invoice; coyID,startDate,endDate,isLessDetls;

    http: this.srvURL = this.reportServer + '/api/Reports/Invoice?invNo=' + invNo;

    return this.httpClient.get(this.srvURL, { responseType: 'blob' });
  }

  getInvoice2(): Observable<any> {
    this.srvURL =
      this.reportServer + '/api/Reports/VersatileandPrecise/Invoice';

    return this.httpClient.get(this.srvURL, { responseType: 'blob' });
  }

  getSaving(): Observable<any> {
    this.srvURL =
      this.reportServer +
      '/api/Reports/VersatileandPrecise/FortifyFinancialAllinOneRetirementSavings';

    return this.httpClient.get(this.srvURL, { responseType: 'blob' });
  }

  getFinancial(): Observable<any> {
    this.srvURL =
      this.reportServer + '/api/Reports/Financial/VarianceAnalysisReport';

    return this.httpClient.get(this.srvURL, { responseType: 'blob' });
  }
  getIncome(): Observable<any> {
    this.srvURL =
      this.reportServer +
      '/api/Reports/Demonstration/ComparativeIncomeStatement';

    return this.httpClient.get(this.srvURL, { responseType: 'blob' });
  }
}
