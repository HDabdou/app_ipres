import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPensionnaireComponent } from './upload-pensionnaire.component';

describe('UploadPensionnaireComponent', () => {
  let component: UploadPensionnaireComponent;
  let fixture: ComponentFixture<UploadPensionnaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPensionnaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPensionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
