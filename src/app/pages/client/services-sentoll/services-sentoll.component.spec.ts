import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesSentollComponent } from './services-sentoll.component';

describe('ServicesSentollComponent', () => {
  let component: ServicesSentollComponent;
  let fixture: ComponentFixture<ServicesSentollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicesSentollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesSentollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
