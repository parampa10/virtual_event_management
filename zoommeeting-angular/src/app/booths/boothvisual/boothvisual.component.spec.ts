import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoothvisualComponent } from './boothvisual.component';

describe('BoothvisualComponent', () => {
  let component: BoothvisualComponent;
  let fixture: ComponentFixture<BoothvisualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoothvisualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoothvisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
