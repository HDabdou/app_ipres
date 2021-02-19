import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { SidebarOperationComponent } from "./sidebarOperation.component";


describe("SidebarComponent", () => {
  let component: SidebarOperationComponent;
  let fixture: ComponentFixture<SidebarOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarOperationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
