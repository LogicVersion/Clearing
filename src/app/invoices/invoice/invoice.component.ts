import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import {FormArray, FormGroup } from '@angular/forms';
import { ConsigneeService } from '../../shared/consignee.service';
import { Customer } from '../../models/customer.model';
import { ToastrService } from 'ngx-toastr';
import { InvoiceListComponent } from '../invoice-list/invoice-list.component';
import { UtilityService } from '../../shared/utility.service';
import { Invoice } from '../invoice.model';
import { MatDialog ,MatDialogConfig} from '@angular/material/dialog';
import { InvoiceDetailsComponent } from '../invoice-details/invoice-details.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  constructor(
    public utilSvc: UtilityService,
    public service: InvoiceService,
    private customerService: ConsigneeService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}
  submitted: boolean = false;
  showSuccessMessage: boolean = false;
  public formControls = this.service.form.controls;
  itemList: Customer[] = []; //=this.customerGroupService.customerGroupList;
  // snoVal = this.service.form.get('SNo')?.value;
  messages: any[] = [];

  //bDate =  this.service.form.controls['bDate'];
  //bDateVal = new Date('2022-04-22'); // this.service.form.controls['bDate'];
  today: String = ''; //<- note String
  date: Date = new Date();

  // // today: String=''; //<- note String
  // // date: Date = new Date();
  //  today: Date = new Date(); // Date = new Date();
  // dateStr: String = ''; //String=''; //<- note String

  selectedCar: number = 0;

  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];

  ngOnInit() {
    //this.reloadData
    this.today = this.date.toISOString().substr(0, 10);
    //this.today = new Date().toLocaleDateString();
    // console.log(today)

    // this.today =
    //   this.date.getFullYear() +
    //   '-' +
    //   (this.date.getMonth() + 1) +
    //   '-' +
    //   this.date.getDate();
    // console.log(today)
    // // output 2021-7-9
    this.service.enableFields(false);
    this.utilSvc.setButtons(true);
    this.customerService
      .getListCombo()
      .then((res) => (this.itemList = res as Customer[]));
  }

  @ViewChild(InvoiceListComponent) childRef?: InvoiceListComponent;

  ngAfterViewInit(): void {
    this.utilSvc.setButtons(true);
  }

  /*
   Returns an array of invalid control/group names, or a zero-length array if
   no invalid controls/groups where found
*/
  public findInvalidControlsRecursive(frm: FormGroup | FormArray): string[] {
    var invalidControls: string[] = [];
    let recursiveFunc = (form: FormGroup | FormArray) => {
      Object.keys(form.controls).forEach((field) => {
        const control = form.get(field);
        if (control?.invalid) invalidControls.push(field);
        if (control instanceof FormGroup) {
          recursiveFunc(control);
        } else if (control instanceof FormArray) {
          recursiveFunc(control);
        }
      });
    };
    recursiveFunc(frm);
    return invalidControls;
  }

  public findInvalidControls(frm: FormGroup) {
    const invalidCtrlX = [];
    const controls = frm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalidCtrlX.push(name);
      }
    }
    return invalidCtrlX;
  }

  formatDateToString(dateVal: Date): string {
    return dateVal.toISOString();
  }

  onSubmit() {
    this.submitted = true;
    if (this.service.form.valid) {
      //console.log(this.findInvalidControlsRecursive(this.service.form));
      // if ( this.findInvalidControls(this.service.form) !=null) {
      //console.log(this.service.flgEdit);

      if (this.service.form.controls['billType'].value == '0') {
        this.toastr.warning('Specify Bill Type (Freight)');
        return;
      }

      if (this.service.form.controls['JobNature'].value == '0') {
        this.toastr.warning('Specify Job Nature');
        return;
      }

      if (typeof this.service.form.controls['pNo'].value == 'object') {
        // an array object
        if (this.service.form.controls['pNo'].value[0] == null) {
          //ret an array with one value, null ie [null]
          this.toastr.warning('Select an Importer');
          return;
        }
      }

      if (this.service.form.controls['JobCode'].value == '') {
        this.toastr.warning('Specify JobCode');
        return;
      }

      if (this.service.form.controls['BLNo'].value == '') {
        this.toastr.warning('Specify BLNo or AWB');
        return;
      }

      if (this.service.form.controls['GoodsDescription'].value == '') {
        this.toastr.warning('Specify Goods Description');
        return;
      }

      if (this.service.form.controls['Content'].value == '') {
        this.toastr.warning('Specify Specific Content');
        return;
      }

      if (this.service.form.controls['Voy'].value == '') {
        this.toastr.warning('Specify Voyage');
        return;
      }

      if (this.service.form.controls['IssuedBy'].value == '') {
        this.toastr.warning('Specify Bill Officer');
        return;
      }

      if (this.service.form.controls['CheckedBy'].value == '') {
        this.toastr.warning('Specify CheckedBy Officer');
        return;
      }

      // If Trim(cboType.Text) = "SEA" And txtTEU.Text = "" Then

      //     If Trim(cbo20ft.Text) = 0 And Trim(cbo40Ft.Text) = 0 Then
      //         MsgBox "Please specify No of Containers"
      //         Exit Sub
      //     End If
      // End If

      if (this.service.flgEdit) {
        this.service.updateRecord(this.service.form.value).subscribe(
          (res) => {
            this.resetForm();
            this.notifyForm('update');
          },
          (err) => {
            // this.handleError(err);
            this.toastr.error('Error has Occured: '+ err, 'Clearing');
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
            // this.handleError(err);
            this.toastr.error('Error has Occured: '+ err, 'Clearing');
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


  private handleError2(errors: any) {
    // this.messages = [];
    // for (let msg of errors) {
    //   this.messages.push(msg);
    // }
    // console.log(this.messages);
    console.log(errors);
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

  resetForm() {
    if (this.service.form) this.service.form.reset();

    //this.service.form= new Invoice();
    this.service.flgEdit = false;
    this.service.clearFields();
  }

  cancelEntry() {
    this.service.flgEdit = false;
    this.utilSvc.setButtons(true);
    this.service.enableFields(false);
    this.resetForm();
  }

  addNew() {
    this.service.flgEdit = false;
    this.service.enableFields(true);
    this.utilSvc.setButtons(false);

    // this.resetForm();
  }
  AddToBill() {
    if (this.service.form.controls['billNO'].value == '***') {
      this.toastr.warning('Select a Bill to Add Items to');
      return;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';
    dialogConfig.height = '70%';
    dialogConfig.data = {
      billNO: this.service.billNoVal,
      bDate: this.service.bDateVal,
    };
    this.dialog.open(InvoiceDetailsComponent, dialogConfig);
  }
  idx = -1;
  updateFields(ctrl: any) {
    console.log(ctrl);
    this.idx = this.itemList.findIndex((p) => p.ConsigneeCode == ctrl);
    this.idx += 1; //just to avoid editing below code lines
    this.service.form.patchValue({
      ConsigneeCode: this.itemList[this.idx - 1].ConsigneeName
        ? this.itemList[this.idx - 1].ConsigneeName
        : '***',
    });
  }
}


