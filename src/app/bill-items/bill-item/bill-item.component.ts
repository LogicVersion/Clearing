import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClearingItemService } from 'src/app/shared/bill-item.service';
import { ClearingItemListComponent } from '../bill-item-list/bill-item-list.component';

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

  @ViewChild(ClearingItemListComponent)
  childRef?: ClearingItemListComponent;

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
      SNo: 0,
      BillItem: '',
      MarkUp: 0,
      isActive: 'YES',
      Serial: 9,
      Amount: 0,
      BillStatus: 'BOTH',
      BillCategory: 'CLEARING',
      FreightCat: 'REGULAR',
    };
  }

  onSubmit(form: NgForm) {
    if (form.value.SNo == 0) this.insertRecord(form);
    else this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postItem(form.value).subscribe((res) => {
      this.toastr.success('Inserted successfully', 'Bill Item');
      this.resetForm(form);
      this.service.reloadList();
      this.notifyForm();
    });
  }

  updateRecord(form: NgForm) {
    this.service.putItem(form.value).subscribe((res) => {
      this.service.reloadList();
      this.notifyForm();
      this.toastr.info('Updated successfully', 'Bill Items');
      this.resetForm(form);

    });
  }
  notifyForm() {
    this.childRef?.reLoadData(); //.reLoadData()
  }


}

