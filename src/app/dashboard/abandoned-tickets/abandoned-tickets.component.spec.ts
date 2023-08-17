import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbandonedTicketsComponent } from './abandoned-tickets.component';

describe('AbandonedTicketsComponent', () => {
  let component: AbandonedTicketsComponent;
  let fixture: ComponentFixture<AbandonedTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbandonedTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbandonedTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
