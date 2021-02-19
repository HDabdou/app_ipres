import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReclamationAdminComponent } from './reclamationAdmin.component';


describe('ReclamationComponent', () => {
  let component: ReclamationAdminComponent;
  let fixture: ComponentFixture<ReclamationAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReclamationAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
