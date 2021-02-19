import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsSentollComponent } from './operations-sentoll.component';

describe('OperationsSentollComponent', () => {
  let component: OperationsSentollComponent;
  let fixture: ComponentFixture<OperationsSentollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationsSentollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsSentollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
