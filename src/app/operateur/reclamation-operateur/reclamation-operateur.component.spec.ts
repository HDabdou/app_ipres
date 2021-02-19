import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationOperateurComponent } from './reclamation-operateur.component';

describe('ReclamationOperateurComponent', () => {
  let component: ReclamationOperateurComponent;
  let fixture: ComponentFixture<ReclamationOperateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReclamationOperateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamationOperateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
