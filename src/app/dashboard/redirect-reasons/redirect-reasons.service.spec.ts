import { TestBed } from '@angular/core/testing';

import { RedirectReasonsService } from './redirect-reasons.service';

describe('RedirectReasonsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RedirectReasonsService = TestBed.get(RedirectReasonsService);
    expect(service).toBeTruthy();
  });
});
