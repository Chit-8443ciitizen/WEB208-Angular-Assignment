import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectDbComponent } from './connect-db.component';

describe('ConnectDbComponent', () => {
  let component: ConnectDbComponent;
  let fixture: ComponentFixture<ConnectDbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectDbComponent]
    });
    fixture = TestBed.createComponent(ConnectDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
