import { Component, OnInit } from '@angular/core';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-saving',
  templateUrl: './saving.component.html',
  styleUrls: ['./saving.component.scss'],
})
export class SavingComponent implements OnInit {
  pdfSource: any;
  constructor(private service: ReportService) {}

  ngOnInit() {
    this.service.getSaving().subscribe((data) => {
      this.pdfSource = data;
    });
  }
}
