import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { FormsModule } from '@angular/forms';
import { SidebarAdminComponent } from "./sidebarAdmin/sidebarAdmin.component";

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule,FormsModule,],
  declarations: [FooterComponent, NavbarComponent, SidebarComponent,SidebarAdminComponent],
  exports: [FooterComponent, NavbarComponent, SidebarComponent,SidebarAdminComponent]
})
export class ComponentsModule {}
