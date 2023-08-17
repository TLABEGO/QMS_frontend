import { TestBed } from '@angular/core/testing';

import { AbandonedTicketsService } from './abandoned-tickets.service';

describe('AbandonedTicketsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AbandonedTicketsService = TestBed.get(AbandonedTicketsService);
    expect(service).toBeTruthy();
  });
});
