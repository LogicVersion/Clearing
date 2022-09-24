import { TestBed } from '@angular/core/testing';

import { BillingExpenseService } from './billing-expense.service';

describe('BillingExpenseService', () => {
  let service: BillingExpenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillingExpenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
