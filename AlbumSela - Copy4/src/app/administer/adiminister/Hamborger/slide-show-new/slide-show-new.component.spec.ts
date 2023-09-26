import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideShowNewComponent } from './slide-show-new.component';

describe('SlideShowNewComponent', () => {
  let component: SlideShowNewComponent;
  let fixture: ComponentFixture<SlideShowNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideShowNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideShowNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
