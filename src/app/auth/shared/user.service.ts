import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
//import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/operators';
import { User } from './user.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {
  readonly apiUrl = environment.apiURL_Admin;
  constructor(private http: HttpClient) { }

  isLoggedIn: boolean=true;

  registerUser(user: User,roles : string[]) {
    const body = JSON.stringify({
      UserName: user.UserName,
      password: user.password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Roles : roles
    });
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'No-Auth': 'True',
    });
    //return this.http.post(this.apiUrl + '/api/User/Register', body,{headers : reqHeader});
    return this.http.post(this.apiUrl + '/registerAdmin', body, {
      headers: reqHeader,
    });

  }

  userAuthentication(userName: string, password: string) {
    //var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    //var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    //return this.http.post(this.apiUrl + '/token', data, { headers: reqHeader });

    var data = JSON.stringify({
      UserName: userName,
      Password: password
    });
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'No-Auth': 'True',
    });
    return this.http.post(this.apiUrl + '/login', data, {
      headers: reqHeader,
    });
  }

  getUserClaims(){
   return this.http.get(this.apiUrl + '/GetUserClaims');
  }

  getAllRoles() {
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.get(this.apiUrl + '/GetAllRoles', {
      headers: reqHeader,
    });
  }

  roleMatch(allowedRoles: any): boolean {
    let isMatch = false;
    let userRoles: string[] = JSON.parse(localStorage.getItem('userRoles')!);
    allowedRoles.forEach((element: any) => {
      if (userRoles.indexOf(element) > -1) {
        isMatch = true;
        //return false;
      }
    });
    return isMatch;

  }

}
