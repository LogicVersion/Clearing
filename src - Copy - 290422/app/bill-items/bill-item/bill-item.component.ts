import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClearingItemService } from 'src/app/shared/bill-item.service';

@Component({
  selector: 'app-bill-item',
  templateUrl: './bill-item.component.html',
  styleUrls: ['./bill-item.component.css'],
})  
export class ClearingItemComponent implements OnInit {
  constructor(
    public service: ClearingItemService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.resetForm();
  }

  counter(i: number) {
    return new Array(i);
}
//my.component.html



  resetForm(form?: NgForm) {
    if (form != null) form.resetForm();
    this.service.formData = {
      SNo: null,
      BillItem: '',
      MarkUp: 0,
      isActive: 'YES',
      Serial: 1,
      Amount: 0,
      BillStatus: 'BOTH',
      BillCategory: 'CLEARING',
      FreightCat: 'REGULAR',
    };
  }

  onSubmit(form: NgForm) {
    if (form.value.SNo == null)  this.insertRecord(form);
    else this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postItem(form.value).subscribe((res) => {
      this.toastr.success('Inserted successfully', 'EMP. Register');
      this.resetForm(form);
      this.service.reloadList();
    });
  }

  updateRecord(form: NgForm) {
    this.service.putItem(form.value).subscribe((res) => {
      this.toastr.info('Updated successfully', 'Bill Items');
      this.resetForm(form);
      this.service.reloadList();
    });
  }
}

