import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  imgHome = environment.imgHome;
  imgHomeLogo = environment.imgHomeLogo;
  constructor() {}

  ngOnInit(): void {}
}
