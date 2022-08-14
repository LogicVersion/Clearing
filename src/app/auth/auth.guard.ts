import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './shared/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router : Router,private userService : UserService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      if (localStorage.getItem('userToken') != null)
      {
        let roles = next.data["roles"] as Array<string>;
        if (roles) {
          var match = this.userService.roleMatch(roles);
          if (match) {
            this.userService.isLoggedIn = true;
            return true;
          }
          else {
            this.userService.isLoggedIn = false;
            this.router.navigate(['/forbidden']);
            return false;
          }
        }
        else
          return true;
      }
      this.router.navigate(['/login']);
      return false;
  }
}
