import { TestBed } from '@angular/core/testing';

import { AuthMainGuard } from './auth-main.guard';

describe('AuthMainGuard', () => {
  let guard: AuthMainGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthMainGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
