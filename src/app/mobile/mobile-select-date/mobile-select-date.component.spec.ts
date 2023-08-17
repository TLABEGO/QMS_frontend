import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSelectDateComponent } from './mobile-select-date.component';

describe('MobileSelectDateComponent', () => {
  let component: MobileSelectDateComponent;
  let fixture: ComponentFixture<MobileSelectDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileSelectDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSelectDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
