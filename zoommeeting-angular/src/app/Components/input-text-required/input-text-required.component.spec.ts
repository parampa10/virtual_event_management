import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTextRequiredComponent } from './input-text-required.component';

describe('InputTextRequiredComponent', () => {
  let component: InputTextRequiredComponent;
  let fixture: ComponentFixture<InputTextRequiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputTextRequiredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTextRequiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
