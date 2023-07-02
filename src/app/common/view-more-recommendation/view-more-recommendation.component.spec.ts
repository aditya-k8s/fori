import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMoreRecommendationComponent } from './view-more-recommendation.component';

describe('ViewMoreRecommendationComponent', () => {
  let component: ViewMoreRecommendationComponent;
  let fixture: ComponentFixture<ViewMoreRecommendationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMoreRecommendationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMoreRecommendationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
