import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
 import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
 import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';

const MaterialComponents = [
  MatButtonModule,
  MatIconModule,
  MatBadgeModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatPaginatorModule,
  MatDialogModule,
  MatToolbarModule,
  MatDatepickerModule,
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
