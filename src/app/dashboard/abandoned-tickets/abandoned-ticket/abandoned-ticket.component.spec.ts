import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbandonedTicketComponent } from './abandoned-ticket.component';

describe('AbandonedTicketComponent', () => {
  let component: AbandonedTicketComponent;
  let fixture: ComponentFixture<AbandonedTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbandonedTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbandonedTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
