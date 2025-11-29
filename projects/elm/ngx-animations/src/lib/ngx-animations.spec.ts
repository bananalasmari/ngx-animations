import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAnimations } from './ngx-animations';

describe('NgxAnimations', () => {
  let component: NgxAnimations;
  let fixture: ComponentFixture<NgxAnimations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxAnimations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxAnimations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
