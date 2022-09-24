import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingExpenseListComponent } from './billing-expense-list.component';

describe('BillingExpenseListComponent', () => {
  let component: BillingExpenseListComponent;
  let fixture: ComponentFixture<BillingExpenseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingExpenseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingExpenseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
