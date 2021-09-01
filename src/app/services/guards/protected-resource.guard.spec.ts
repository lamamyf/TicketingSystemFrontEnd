import { TestBed } from '@angular/core/testing';

import { ProtectedResourceGuard } from './protected-resource.guard';

describe('ProtectedResourceGuard', () => {
  let guard: ProtectedResourceGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProtectedResourceGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
