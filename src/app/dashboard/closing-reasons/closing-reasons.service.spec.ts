import { TestBed } from '@angular/core/testing';

import { ClosingReasonsService } from './closing-reasons.service';

describe('ClosingReasonsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClosingReasonsService = TestBed.get(ClosingReasonsService);
    expect(service).toBeTruthy();
  });
});
