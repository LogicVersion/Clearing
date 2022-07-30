import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from 'src/app/shared/utility.service';
import { ConsigneeGroupService } from '../../shared/consignee-group.service';
import { ConsigneeGroupListComponent } from '../consignee-group-list/consignee-group-list.component';

@Component({
  selector: 'app-consignee-group',
  templateUrl: './consignee-group.component.html',
  styleUrls: ['./consignee-group.component.css'],
})
export class ConsigneeGroupComponent implements OnInit {
  constructor(
    public service: ConsigneeGroupService,
    private toastr: ToastrService,
    public utilSvc: UtilityService
  ) {}

  submitted: boolean = false;
  showSuccessMessage: boolean = false;
  public formControls = this.service.form.controls;
  snoVal = this.service.form.get('SNo')?.value;

  ngOnInit(): void {
    this.service.enableFields(false);
  }

  @ViewChild(ConsigneeGroupListComponent)
  childRef?: ConsigneeGroupListComponent;

  addNew() {
    this.service.flgEdit = false;
    this.utilSvc.setButtons(false);
    this.service.enableFields(true);
  }

  cancelEntry() {
    this.service.flgEdit = false;
    this.utilSvc.setButtons(true);
    this.service.enableFields(false);
    this.resetForm();
  }

  resetForm() {
    if (this.service.form) this.service.form.reset();

    //this.service.form= new Invoice();
    this.service.flgEdit = false;
    this.service.clearFields();
  }

  onSubmit() {
    this.submitted = true;
    if (this.service.form.valid) {
      if (this.service.form.controls['GroupName'].value == '') {
        this.toastr.warning('Specify GroupName');
        //this.service.formData.patchValue({ Qty: 1 });
        return;
      }

      if (this.service.flgEdit) {
        this.service.updateRecord(this.service.form.value).subscribe(
          (res) => {
            this.resetForm();
            this.notifyForm('update');
          },
          (err) => {
            this.handleError(err);
            this.toastr.error(err, 'Clearing');
          }
        );
      } else {
        //form.get('SNo')!.value == 0
        this.service.insertRecord(this.service.form.value).subscribe(
          (res) => {
            this.resetForm();
            this.notifyForm('insert');
          },
          (err) => {
            this.handleError(err);
            this.toastr.error('Error has Occured!', 'Clearing');
          }
        );
      }
    }
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    // return errorMessage;
  }

  notifyForm(updateVal: string) {
    this.showSuccessMessage = true;
    setTimeout(() => (this.showSuccessMessage = false), 3000);
    this.submitted = false;
    if ((updateVal = 'insert'))
      this.toastr.success('Record saved successfully', 'Clearing Saved');
    else this.toastr.success('Record updated successfully', 'Clearing Updated');
    this.utilSvc.setButtons(true);
    this.service.enableFields(false);
    this.service.flgEdit = false;
    this.childRef?.reLoadData();
  }

  resetForm2() {
    if (this.service.form) this.service.form.reset();

    //this.service.form= new Invoice();
    this.service.flgEdit = false;
    this.service.clearFields();
  }
}
