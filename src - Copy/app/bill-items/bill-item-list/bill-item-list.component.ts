import { Component, OnInit } from '@angular/core';
import { ClearingItemService } from 'src/app/shared/bill-item.service';
import { ClearingItem } from 'src/app/shared/bill-item.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bill-item-list',
  templateUrl: './bill-item-list.component.html',
  styleUrls: ['./bill-item-list.component.css'],
})
export class ClearingItemListComponent implements OnInit {
  constructor(
    public service: ClearingItemService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.service.reloadList();
  }

  populateForm(bItem: ClearingItem) {
    this.service.formData = Object.assign({}, bItem);
  }

  onDelete(id: null | number) {
    if(id!=null){
          if (confirm('Are you sure to delete this record?')) {
            this.service.deleteItem(id).subscribe((res) => {
              this.service.reloadList();
              this.toastr.warning('Deleted successfully', 'ClearingItem');
            });
          }
    }

  }
}
