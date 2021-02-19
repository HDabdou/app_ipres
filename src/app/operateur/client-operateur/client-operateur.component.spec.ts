import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientOperateurComponent } from './client-operateur.component';

describe('ClientOperateurComponent', () => {
  let component: ClientOperateurComponent;
  let fixture: ComponentFixture<ClientOperateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientOperateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientOperateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
