import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdiministerComponent } from './adiminister.component';

describe('AdiministerComponent', () => {
  let component: AdiministerComponent;
  let fixture: ComponentFixture<AdiministerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdiministerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdiministerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
