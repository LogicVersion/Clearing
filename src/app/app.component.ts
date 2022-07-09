import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { concatMap } from 'rxjs/operators';
import { LoadingService } from './shared/loading.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Clearing';
  coyID = environment.coyID;
  loading$ = this.loader.loading$;

  constructor(public loader: LoadingService, private http: HttpClient) {}

// fruits = ["apple", "orange", "banana", "grapes"];

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
