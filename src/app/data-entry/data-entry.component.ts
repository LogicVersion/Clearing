import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { concatMap } from 'rxjs/operators';
import { LoadingService } from '../shared/loading.service';


@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.css'],
})
export class DataEntryComponent implements OnInit {
  title = 'Clearing';
  coyID = environment.coyID;
  loading$ = this.loader.loading$;

  constructor(public loader: LoadingService, private http: HttpClient) {}

    ngOnInit(): void {

    }
  // fetchData() {
  //   this.http
  //     .get('https://api.github.com/users/thisiszoaib')
  //     .subscribe((res) => {
  //       console.log(res);
  //     });
  // }

  // fetchMultipleData() {
  //   this.http
  //     .get('https://api.github.com/users/thisiszoaib')
  //     .subscribe((res) => {
  //       console.log(res);
  //     });

  //   this.http
  //     .get('https://api.github.com/users/thisiszoaib')
  //     .pipe(concatMap(() => this.http.get('https://api.github.com/users')))
  //     .subscribe((res) => {
  //       console.log(res);
  //     });
  // }
}
