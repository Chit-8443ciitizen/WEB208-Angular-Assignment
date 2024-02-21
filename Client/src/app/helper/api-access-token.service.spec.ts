import { TestBed } from '@angular/core/testing';

import { ApiAccessTokenService } from './api-access-token.service';

describe('ApiAccessTokenService', () => {
  let service: ApiAccessTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAccessTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
