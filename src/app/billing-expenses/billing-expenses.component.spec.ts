import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingExpensesComponent } from './billing-expenses.component';

describe('BillingExpensesComponent', () => {
  let component: BillingExpensesComponent;
  let fixture: ComponentFixture<BillingExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingExpensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
