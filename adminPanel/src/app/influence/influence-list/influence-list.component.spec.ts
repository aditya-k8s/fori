import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluenceListComponent } from './influence-list.component';

describe('InfluenceListComponent', () => {
  let component: InfluenceListComponent;
  let fixture: ComponentFixture<InfluenceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfluenceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
