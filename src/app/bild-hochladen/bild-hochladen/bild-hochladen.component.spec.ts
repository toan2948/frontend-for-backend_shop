import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BildHochladenComponent } from './bild-hochladen.component';

describe('BildHochladenComponent', () => {
  let component: BildHochladenComponent;
  let fixture: ComponentFixture<BildHochladenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BildHochladenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BildHochladenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
