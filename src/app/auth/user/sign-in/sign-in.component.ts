import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  isLoginError : boolean = false;
  constructor(private userService : UserService,private router : Router) { }

  ngOnInit() {
  }

  OnSubmit(userName: string,password: string){
     this.userService.userAuthentication(userName,password).subscribe((data : any)=>{
      localStorage.setItem('userToken',data.token);
      const payload = JSON.parse(atob(data.token.split('.')[1]));
      const roles =
        payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      localStorage.setItem('userRoles', roles);
      this.router.navigate(['/DataEntry']);
    },
    (err : HttpErrorResponse)=>{
      this.isLoginError = true;
    });
  }

}
