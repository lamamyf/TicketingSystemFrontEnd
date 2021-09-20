import { TestBed } from '@angular/core/testing';

import { AgentHttpService } from './agent-http.service';

describe('AgentHttpService', () => {
  let service: AgentHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
