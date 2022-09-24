import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingExpenseComponent } from './billing-expense.component';

describe('BillingExpenseComponent', () => {
  let component: BillingExpenseComponent;
  let fixture: ComponentFixture<BillingExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingExpenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
