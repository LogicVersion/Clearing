import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from '../auth/shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  imgHome = environment.imgHome;
  imgHomeLogo = environment.imgHomeLogo;




  constructor(private userService: UserService) {}

  ngOnInit(): void {

    this.userService.isLoggedIn=true;
  }


}
