import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { ConsigneeService } from 'src/app/shared/consignee.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTooltip } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import { identity } from 'rxjs';
import {
  DatatableDataSource,
  DatatableItem,
} from 'src/app/datatable/datatable-datasource';
import { UtilityService } from 'src/app/shared/utility.service';
import { InvoiceService } from '../invoice.service';
import { Invoice, InvoiceDetailsList, InvoiceList } from '../invoice.model';
import { DatePipe } from '@angular/common';
import { InvoiceDetails } from 'src/app/invoices/invoice.model';
import { InvoiceDetailsService } from '../invoice-details.service';
//import { DateFormatPipe } from 'src/app/shared/utili                                                                    ty.service';

@Component({
  selector: 'app-invoice-details-list',
  templateUrl: './invoice-details-list.component.html',
  styleUrls: ['./invoice-details-list.component.css'],
})
export class InvoiceDetailsListComponent implements OnInit {
  displayedColumns: string[] = [
    // 'PK_SNo',
    'Serial',
    'billNO',
    'drgName',
    'Qty',
    'Price',
    'subTotal',
    // 'VAT',
    // 'Interest',
    // 'Total',
    'actions',
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>;
  //@ViewChild(MatTable) table!: MatTable<DatatableItem>;
  //dataSource: DatatableDataSource;
  //dataSource= this.service.customerList; //this.service.customerList; //ELEMENT_DATA;
  dataSource!: MatTableDataSource<any>; // new MatTableDataSource(this.dataSource);
  searchKey?: string;
  @Input() billNoChild: string = '';

  constructor(
    private utilSvc: UtilityService,
    private service: InvoiceDetailsService,
    private toastr: ToastrService
  ) {
    //this.dataSource = new DatatableDataSource();
  }

  ngOnInit(): void {
    this.service.enableFields(true);
      this.utilSvc.setButtons(false);
    this.reLoadData();
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }

  reLoadData(): void {
    this.service.getList(this.billNoChild).subscribe((res: any) => {
      this.service.InvoiceDetailsList = res as InvoiceDetailsList[];
      this.dataSource = new MatTableDataSource(this.service.InvoiceDetailsList); //ELEMENT_DATA;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.service.updateTotal();
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

  // addNew() {
  //   this.service.flgEdit = false;
  //   this.utilSvc.setButtons(false);
  //   this.service.enableFields(true);
  // }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter(this.searchKey);
  }

  applyFilter(filterText: string) {
    // if (filterText!=null)
    this.dataSource.filter = filterText.trim().toLowerCase();
  }

  // format date in typescript
  getFormatedDate(date: Date, format: string) {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, format);
  }

  populateForm(row: InvoiceDetails) {
    //this.service.FormData = Object.assign({}, row);
    this.service.flgEdit = true;
    this.service.enableFields(true);
    this.utilSvc.setButtons(false);
    let rowCopy;
    rowCopy = Object.assign({}, row);
    // const bDateVal = rowCopy.bDate; //.toISOString().substr(0, 10);
    // const dateString = bDateVal.toISOString().substr(0, 10);
    // const newDate = new Date(dateString);
    // rowCopy.bDate = newDate;
    this.service.FormData(rowCopy);
    this.service.key = row.PK_SNo; //strParam

    this.service.billNoVal = row.billNO;
    this.service.bDateVal = row.dtDate;
  }

  onDelete(row: InvoiceDetails) {
    // console.log(`id is: ${id}`);
    const id = row.PK_SNo;
    if (id != null) {
      if (confirm('Are you sure to delete this record?')) {
        this.service.deleteRecord(id).subscribe((res: any) => {
          this.utilSvc.setButtons(true);
          this.service.enableFields(false);
          this.service.flgEdit = false;
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
