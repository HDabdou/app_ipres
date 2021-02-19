import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponentVerif } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponentVerif;
  let fixture: ComponentFixture<DashboardComponentVerif>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponentVerif ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponentVerif);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
