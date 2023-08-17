import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosingReasonsComponent } from './closing-reasons.component';

describe('ClosingReasonsComponent', () => {
  let component: ClosingReasonsComponent;
  let fixture: ComponentFixture<ClosingReasonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosingReasonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosingReasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
