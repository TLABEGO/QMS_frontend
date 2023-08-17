import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectReasonComponent } from './redirect-reason.component';

describe('RedirectReasonComponent', () => {
  let component: RedirectReasonComponent;
  let fixture: ComponentFixture<RedirectReasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectReasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
