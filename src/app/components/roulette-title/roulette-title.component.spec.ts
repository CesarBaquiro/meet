import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouletteTitleComponent } from './roulette-title.component';

describe('RouletteTitleComponent', () => {
  let component: RouletteTitleComponent;
  let fixture: ComponentFixture<RouletteTitleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RouletteTitleComponent]
    });
    fixture = TestBed.createComponent(RouletteTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
