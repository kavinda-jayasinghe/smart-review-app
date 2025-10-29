import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartReview } from './smart-review';

describe('SmartReview', () => {
  let component: SmartReview;
  let fixture: ComponentFixture<SmartReview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartReview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartReview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

