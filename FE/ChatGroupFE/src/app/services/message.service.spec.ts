import { TestBed } from '@angular/core/testing';

import { getDataService } from './getDataService';

describe('MessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: getDataService = TestBed.get(getDataService);
    expect(service).toBeTruthy();
  });
});
