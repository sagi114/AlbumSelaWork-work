import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatagorysComponent } from './catagorys.component';

describe('CatagorysComponent', () => {
  let component: CatagorysComponent;
  let fixture: ComponentFixture<CatagorysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatagorysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatagorysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
