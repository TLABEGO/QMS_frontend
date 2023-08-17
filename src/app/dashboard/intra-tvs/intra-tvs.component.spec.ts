import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntraTvsComponent } from './intra-tvs.component';

describe('IntraTvsComponent', () => {
  let component: IntraTvsComponent;
  let fixture: ComponentFixture<IntraTvsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntraTvsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntraTvsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
