import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntraTvComponent } from './intra-tv.component';

describe('IntraTvComponent', () => {
  let component: IntraTvComponent;
  let fixture: ComponentFixture<IntraTvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntraTvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntraTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
