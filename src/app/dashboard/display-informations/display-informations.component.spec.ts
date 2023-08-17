import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayInformationsComponent } from './display-informations.component';

describe('DisplayInformationsComponent', () => {
  let component: DisplayInformationsComponent;
  let fixture: ComponentFixture<DisplayInformationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayInformationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
