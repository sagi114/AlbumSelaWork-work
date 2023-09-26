import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineImgComponent } from './online-img.component';

describe('OnlineImgComponent', () => {
  let component: OnlineImgComponent;
  let fixture: ComponentFixture<OnlineImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
