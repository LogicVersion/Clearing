import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ClearingItemService } from 'src/app/shared/bill-item.service';
import { ClearingItem } from 'src/app/shared/bill-item.model';
import { ToastrService } from 'ngx-toastr';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-bill-item-list',
  templateUrl: './bill-item-list.component.html',
  styleUrls: ['./bill-item-list.component.css'],
})
export class ClearingItemListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    // 'SNo',
    'BillItem',
    // 'MarkUp',
    'isActive',
    'Serial',
    // 'Amount',
    'BillStatus',
    'BillCategory',
    'FreightCat',
    'actions',
  ];

  // dataSource = this.service.list; //ELEMENT_DATA;
  dataSource!: MatTableDataSource<any>; // new MatTableDataSource(this.dataSource);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    public service: ClearingItemService,
    private toastr: ToastrService
  ) {}

  searchKey?: string;

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter(this.searchKey);
  }

  applyFilter(filterText: string) {
    // if (filterText!=null)
    this.dataSource.filter = filterText.trim().toLowerCase();
  }

  ngOnInit() {
    this.service.reloadList().subscribe((res) => {
      this.service.list = res as ClearingItem[];
      this.dataSource = new MatTableDataSource(this.service.list); //ELEMENT_DATA;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    // (this.dataSource = res as ClearingItem[]));

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

  onDelete(row: ClearingItem) {
    const id = row.SNo;
    if (id != 0) {
      if (confirm('Are you sure to delete this record?')) {
        this.service.deleteItem(id).subscribe((res) => {
          this.service.reloadList();
          this.toastr.warning('Deleted successfully', 'ClearingItem');
        });
      }
    }
  }
}
