import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosingReasonComponent } from './closing-reason.component';

describe('ClosingReasonComponent', () => {
  let component: ClosingReasonComponent;
  let fixture: ComponentFixture<ClosingReasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosingReasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosingReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
