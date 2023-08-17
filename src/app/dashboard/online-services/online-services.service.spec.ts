import { TestBed } from '@angular/core/testing';

import { OnlineServicesService } from './online-services.service';

describe('OnlineServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnlineServicesService = TestBed.get(OnlineServicesService);
    expect(service).toBeTruthy();
  });
});
