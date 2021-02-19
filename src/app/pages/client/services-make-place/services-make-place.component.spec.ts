import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesMakePlaceComponent } from './services-make-place.component';

describe('ServicesMakePlaceComponent', () => {
  let component: ServicesMakePlaceComponent;
  let fixture: ComponentFixture<ServicesMakePlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesMakePlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesMakePlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
