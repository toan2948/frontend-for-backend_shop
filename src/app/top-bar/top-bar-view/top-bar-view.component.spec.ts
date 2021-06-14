import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarViewComponent } from './top-bar-view.component';

describe('TopBarViewComponent', () => {
  let component: TopBarViewComponent;
  let fixture: ComponentFixture<TopBarViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopBarViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
