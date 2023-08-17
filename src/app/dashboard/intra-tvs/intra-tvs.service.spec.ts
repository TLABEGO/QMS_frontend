import { TestBed } from '@angular/core/testing';

import { IntraTvsService } from './intra-tvs.service';

describe('IntraTvsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IntraTvsService = TestBed.get(IntraTvsService);
    expect(service).toBeTruthy();
  });
});
