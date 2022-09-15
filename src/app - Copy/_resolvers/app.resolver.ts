import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AppResolve implements Resolve<any> {
  constructor(private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): any {
    //window.location.href = "http://www.google.com";
    //window.open('http://localhost:8099/reports.aspx', '_blank');

    // this.router.navigate(['/home']);
    window.open('http://sapidholdingsonline.com/reports.aspx', '_blank');
    return true;
  }
}