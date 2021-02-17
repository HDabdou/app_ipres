import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SidebarVerificateurComponent } from "./sidebarVerificateur.component";

describe("SidebarComponent", () => {
  let component: SidebarVerificateurComponent;
  let fixture: ComponentFixture<SidebarVerificateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarVerificateurComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarVerificateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
