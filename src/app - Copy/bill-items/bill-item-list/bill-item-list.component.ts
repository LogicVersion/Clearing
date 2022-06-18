import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClearingItemService } from 'src/app/shared/bill-item.service';
import { ClearingItem } from 'src/app/shared/bill-item.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bill-item-list',
  templateUrl: './bill-item-list.component.html',
  styleUrls: ['./bill-item-list.component.css'],
})
export class ClearingItemListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = [
    'SNo',
    'BillItem',
    'MarkUp',
    'isActive',
    'Serial',
    'Amount',
    'BillStatus',
    'BillCategory',
    'FreightCat',
  ];

  dataSource = this.service.list; //ELEMENT_DATA;

  constructor(
    public service: ClearingItemService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.service
      .reloadList()
      .subscribe((res) => (this.dataSource = res as ClearingItem[]));

    // this.http
    //   .get<User>('api/user/id')
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((user) => {
    //     this.user = user;
    //   });

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    // no need for unsubscribe cos res has been cast as ClearingItem[]

    // this.destroy$.next();  // trigger the unsubscribe
    // this.destroy$.complete(); // finalize & clean up the subject stream

  }

  populateForm(bItem: ClearingItem) {
    this.service.formData = Object.assign({}, bItem);
  }

  onDelete(id: null | number) {
    if (id != null) {
      if (confirm('Are you sure to delete this record?')) {
        this.service.deleteItem(id).subscribe((res) => {
          this.service.reloadList();
          this.toastr.warning('Deleted successfully', 'ClearingItem');
        });
      }
    }
  }
}
