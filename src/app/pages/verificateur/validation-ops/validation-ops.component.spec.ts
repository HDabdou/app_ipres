import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationOpsComponent } from './validation-ops.component';

describe('ValidationOpsComponent', () => {
  let component: ValidationOpsComponent;
  let fixture: ComponentFixture<ValidationOpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationOpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationOpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
