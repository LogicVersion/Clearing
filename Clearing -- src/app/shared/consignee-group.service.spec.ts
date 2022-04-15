import { TestBed } from '@angular/core/testing';

import { ConsigneeGroupService } from './consignee-group.service';

describe('ConsigneeGroupService', () => {
  let service: ConsigneeGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsigneeGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
