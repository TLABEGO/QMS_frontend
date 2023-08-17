import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectReasonsComponent } from './redirect-reasons.component';

describe('RedirectReasonsComponent', () => {
  let component: RedirectReasonsComponent;
  let fixture: ComponentFixture<RedirectReasonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectReasonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectReasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
