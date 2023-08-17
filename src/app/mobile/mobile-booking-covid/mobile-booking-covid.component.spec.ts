import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileBookingCovidComponent } from './mobile-booking-covid.component';

describe('MobileBookingCovidComponent', () => {
  let component: MobileBookingCovidComponent;
  let fixture: ComponentFixture<MobileBookingCovidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileBookingCovidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileBookingCovidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
