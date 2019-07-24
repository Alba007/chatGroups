import { TestBed } from '@angular/core/testing';

import { HttpReqServiceService } from './http-req-service.service';

describe('HttpReqServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpReqServiceService = TestBed.get(HttpReqServiceService);
    expect(service).toBeTruthy();
  });
});
