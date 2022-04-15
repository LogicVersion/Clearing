import { Component, OnInit } from '@angular/core';
import { ConsigneeService } from '../shared/consignee.service';
import { FormGroup } from '@angular/forms';
import { ConsigneeGroupService } from '../shared/consignee-group.service';
@Component({
  selector: 'app-consignee',
  templateUrl: './consignee.component.html',
  styleUrls: ['./consignee.component.css'],
})
export class ConsigneeComponent implements OnInit {
  constructor(public customerService: ConsigneeService,
    private customerGroupService: ConsigneeGroupService) {}
  submitted: boolean = false;
  showSuccessMessage: boolean = false;
  public formControls = this.customerService.form.controls;
public custGroups=this.customerGroupService.customerGroupList

  ngOnInit() {}

  onSubmit() {
    this.submitted = true;
    if (this.customerService.form.valid) {
      if (this.customerService.form.get('SNo')!.value == null)
        this.customerService.insertCustomer(this.customerService.form.value);
      else this.customerService.updateCustomer(this.customerService.form.value);
      this.showSuccessMessage = true;
      setTimeout(() => (this.showSuccessMessage = false), 3000);
      this.submitted = false;
      this.customerService.form.reset();
      //this is to be done for proper reset operation
      this.customerService.form.setValue({
        SNo: null,
        ConsigneeCode: '',
        ConsigneeName: '',
        GroupName: '--Select--',
        ConsigneeAddress: '',
      });
    }
  }
}

