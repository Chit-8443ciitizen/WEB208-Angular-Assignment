import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMidComponent } from './dashboard-mid.component';

describe('DashboardMidComponent', () => {
  let component: DashboardMidComponent;
  let fixture: ComponentFixture<DashboardMidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardMidComponent]
    });
    fixture = TestBed.createComponent(DashboardMidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
