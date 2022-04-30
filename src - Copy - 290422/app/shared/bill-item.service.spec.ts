import { TestBed } from '@angular/core/testing';

import { ClearingItemService } from './bill-item.service';

describe('ClearingItemService', () => {
  let service: ClearingItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClearingItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
