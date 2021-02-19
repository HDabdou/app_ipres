import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SidebarClientsComponent } from "./sidebarClients.component";

describe("SidebarComponent", () => {
  let component: SidebarClientsComponent;
  let fixture: ComponentFixture<SidebarClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarClientsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
