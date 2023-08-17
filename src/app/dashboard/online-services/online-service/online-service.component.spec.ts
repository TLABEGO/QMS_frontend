import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineServiceComponent } from './online-service.component';

describe('OnlineServiceComponent', () => {
  let component: OnlineServiceComponent;
  let fixture: ComponentFixture<OnlineServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
