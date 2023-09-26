import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptWellcomePageComponent } from './accept-wellcome-page.component';

describe('AcceptWellcomePageComponent', () => {
  let component: AcceptWellcomePageComponent;
  let fixture: ComponentFixture<AcceptWellcomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptWellcomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptWellcomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
