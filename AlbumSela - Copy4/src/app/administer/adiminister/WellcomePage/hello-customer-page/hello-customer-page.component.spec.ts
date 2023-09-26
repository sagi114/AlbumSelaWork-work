import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloCustomerPageComponent } from './hello-customer-page.component';

describe('HelloCustomerPageComponent', () => {
  let component: HelloCustomerPageComponent;
  let fixture: ComponentFixture<HelloCustomerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelloCustomerPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloCustomerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
