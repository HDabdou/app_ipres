import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardVerifComponent } from './dashboard-verif.component';

describe('DashboardVerifComponent', () => {
  let component: DashboardVerifComponent;
  let fixture: ComponentFixture<DashboardVerifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardVerifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardVerifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
