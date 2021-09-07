import { TestBed } from '@angular/core/testing';

import { UserManagentService } from './user-managent.service';

describe('UserManagentService', () => {
  let service: UserManagentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserManagentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
