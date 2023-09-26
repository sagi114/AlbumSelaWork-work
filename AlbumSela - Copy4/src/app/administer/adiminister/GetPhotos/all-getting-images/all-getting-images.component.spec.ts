import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGettingImagesComponent } from './all-getting-images.component';

describe('AllGettingImagesComponent', () => {
  let component: AllGettingImagesComponent;
  let fixture: ComponentFixture<AllGettingImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllGettingImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllGettingImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
