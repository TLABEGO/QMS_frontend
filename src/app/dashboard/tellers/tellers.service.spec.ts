import { TestBed } from '@angular/core/testing';

import { TellersService } from './tellers.service';

describe('TellersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TellersService = TestBed.get(TellersService);
    expect(service).toBeTruthy();
  });
});
