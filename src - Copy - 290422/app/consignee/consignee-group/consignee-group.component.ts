import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConsigneeGroupService } from '../../shared/consignee-group.service';

@Component({
  selector: 'app-consignee-group',
  templateUrl: './consignee-group.component.html',
  styleUrls: ['./consignee-group.component.css'],
})
export class ConsigneeGroupComponent implements OnInit {
  constructor(
    public service: ConsigneeGroupService  ) {}
  
  submitted: boolean = false;
  showSuccessMessage: boolean = false;
  public formControls = this.service.form.controls;
  snoVal = this.service.form.get('SNo')?.value;

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    if (this.service.form.valid) {
      if (this.service.form.get('SNo')!.value == null)
        this.service.insertRecord(this.service.form.value);
      else this.service.updateRecord(this.service.form.value);
      this.showSuccessMessage = true;
      setTimeout(() => (this.showSuccessMessage = false), 3000);
      this.submitted = false;
      this.service.form.reset();
      //this is to be done for proper reset operation
      this.service.form.setValue({
        SNo: null,
        ConsigneeCode: '',
        ConsigneeName: '',
        GroupName: '--Select--',
        ConsigneeAddress: '',
      });
    }
  }
}
