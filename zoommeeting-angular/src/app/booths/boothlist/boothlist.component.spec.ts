import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoothlistComponent } from './boothlist.component';

describe('BoothlistComponent', () => {
  let component: BoothlistComponent;
  let fixture: ComponentFixture<BoothlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoothlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoothlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
