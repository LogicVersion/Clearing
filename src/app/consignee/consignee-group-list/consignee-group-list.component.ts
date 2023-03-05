import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CustomerGroup } from 'src/app/models/customer.model';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTooltip } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import { identity, Subscription } from 'rxjs';
import {
  DatatableDataSource,
  DatatableItem,
} from 'src/app/datatable/datatable-datasource';
import { ConsigneeGroupService } from 'src/app/shared/consignee-group.service';
import { UtilityService } from 'src/app/shared/utility.service';

@Component({
  selector: 'app-consignee-group-list',
  templateUrl: './consignee-group-list.component.html',
  styleUrls: ['./consignee-group-list.component.css'],
})
export class ConsigneeGroupListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['ID', 'GroupName', 'actions'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>;
  dataSource!: MatTableDataSource<any>; // new MatTableDataSource(this.dataSource);
  searchKey?: string;

  constructor(
    private service: ConsigneeGroupService,
    private utilSvc: UtilityService,
    private toastr: ToastrService
  ) {
    //this.dataSource = new DatatableDataSource();
  }

  subscription? : Subscription = undefined

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    // throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.reLoadData();
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }

  reLoadData(): void {
    this.subscription = this.service.getList().subscribe((res) => {
      this.service.customerGroupList = res as CustomerGroup[];
      this.dataSource = new MatTableDataSource(this.service.customerGroupList); //ELEMENT_DATA;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  // ngOnInitFirebase() {
  //   this.service.getEmployees().subscribe((list) => {
  //     let array = list.map((item) => {
  //       let departmentName = this.departmentService.getDepartmentName(
  //         item.payload.val()['department']
  //       );
  //       return {
  //         $key: item.key,
  //         departmentName,
  //         ...item.payload.val(),
  //       };
  //     });
  //     this.listData = new MatTableDataSource(array);
  //     this.listData.sort = this.sort;
  //     this.listData.paginator = this.paginator;
  //     this.listData.filterPredicate = (data, filter) => {
  //       return this.displayedColumns.some((ele) => {
  //         return (
  //           ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1
  //         );
  //       });
  //     };
  //   });
  // }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    //this.table.dataSource = this.dataSource;
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter(this.searchKey);
  }

  applyFilter(filterText: string) {
    // if (filterText!=null)
    this.dataSource.filter = filterText.trim().toLowerCase();
  }

  populateForm(row: CustomerGroup) {
    this.service.flgEdit = true;
    this.service.enableFields(true);
    this.utilSvc.setButtons(false);
    let rowCopy;
    rowCopy = Object.assign({}, row);
    this.service.FormData(rowCopy);
  }

  onDelete(row: CustomerGroup) {
    // console.log(`id is: ${id}`);
    const id = row.ID;
    if (id != null) {
      if (confirm('Are you sure to delete this record?')) {
        this.subscription = this.service.deleteRecord(id).subscribe((res) => {
          this.reLoadData();
          // const index = this.dataSource.indexOf(row, 0);
          // if (index > -1) {
          //   this.dataSource.splice(index, 1);
          // }
          //this.table.renderRows();
          this.toastr.warning('Deleted successfully', 'Clearing');
        });
      }
    }
  }

  // delete(row: any): void {
  //   const index = this.dataSource.indexOf(row, 0);
  //   if (index > -1) {
  //     this.dataSource.splice(index, 1);
  //   }
  //   this.table.renderRows();
  // }
}
