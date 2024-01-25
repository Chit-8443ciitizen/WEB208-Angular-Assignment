import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRightComponent } from './dashboard-right.component';

describe('DashboardRightComponent', () => {
  let component: DashboardRightComponent;
  let fixture: ComponentFixture<DashboardRightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardRightComponent]
    });
    fixture = TestBed.createComponent(DashboardRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
