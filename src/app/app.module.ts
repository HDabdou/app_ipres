import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { LoginComponent } from './login/login.component';
import { ReclamationComponent } from './pages/verificateur/reclamation/reclamation.component';
import { OperationsComponent } from './pages/verificateur/operations/operations.component';
import { DashboardComponent } from './pages/verificateur/dashboard/dashboard.component';
import { ValidationOpsComponent } from './pages/verificateur/validation-ops/validation-ops.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot()
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, LoginComponent, ReclamationComponent, OperationsComponent, DashboardComponent, ValidationOpsComponent,],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
