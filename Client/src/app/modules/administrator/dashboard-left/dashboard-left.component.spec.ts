import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLeftComponent } from './dashboard-left.component';

describe('DashboardLeftComponent', () => {
  let component: DashboardLeftComponent;
  let fixture: ComponentFixture<DashboardLeftComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardLeftComponent]
    });
    fixture = TestBed.createComponent(DashboardLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
