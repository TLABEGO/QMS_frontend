import { TestBed } from '@angular/core/testing';

import { DisplayInformationsService } from './display-informations.service';

describe('DisplayInformationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DisplayInformationsService = TestBed.get(DisplayInformationsService);
    expect(service).toBeTruthy();
  });
});
