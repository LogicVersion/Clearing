import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { concatMap } from 'rxjs/operators';
import { LoadingService } from './shared/loading.service';
import { Router } from '@angular/router';
import { UserService } from './auth/shared/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Clearing';
  coyID = environment.coyID;
  loading$ = this.loader.loading$;

  constructor(
    public loader: LoadingService,
    private router: Router,
    private http: HttpClient,
    public service: UserService
  ) {}

  Logout() {
    localStorage.removeItem('userToken');
    this.service.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  Login() {
    // localStorage.removeItem('userToken');
    this.service.isLoggedIn = true;
    this.router.navigate(['/login']);

  }

  // selectedCar: number=0;

  // cars = [
  //   { id: 1, name: 'Volvo' },
  //   { id: 2, name: 'Saab' },
  //   { id: 3, name: 'Opel' },
  //   { id: 4, name: 'Audi' },
  // ];

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
