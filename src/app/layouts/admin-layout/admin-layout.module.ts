import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/admin/dashboard.component";
import { IconsComponent } from "../../pages/verificateur/icons.component";
import { MapComponent } from "../../pages/operateur/map.component";
import { NotificationsComponent } from "../../pages/client/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { ReclamationComponent } from "../../pages/verificateur/reclamation/reclamation.component";
import { OperationsComponent } from "../../pages/verificateur/operations/operations.component";
import { DashboardComponentVerif} from "../../pages/verificateur/dashboard/dashboard.component";
import { ValidationOpsComponent  } from "../../pages/verificateur/validation-ops/validation-ops.component";
import { ServicesSentollComponent } from 'src/app/pages/client/services-sentoll/services-sentoll.component';
import { ServicesMakePlaceComponent } from 'src/app/pages/client/services-make-place/services-make-place.component';
import { OperationsSentollComponent } from 'src/app/pages/client/operations-sentoll/operations-sentoll.component';
// import { RtlComponent } from "../../pages/rtl/rtl.component";


import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DashboardVerifComponent } from "src/app/pages/verificateur/dashboard-verif/dashboard-verif.component";
import { CreateUserComponent } from "src/app/admin/create-user/create-user.component";
import { UploadFileComponent } from "src/app/admin/upload-file/upload-file.component";
import { ReclamationOperateurComponent } from "src/app/operateur/reclamation-operateur/reclamation-operateur.component";
import { ClientOperateurComponent } from "src/app/operateur/client-operateur/client-operateur.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TablesComponent,
    IconsComponent,
    TypographyComponent,
    NotificationsComponent,
    MapComponent,
    ReclamationComponent,
    OperationsComponent,
    DashboardComponentVerif,
    ValidationOpsComponent,
    ServicesSentollComponent,
    ServicesMakePlaceComponent,
    OperationsSentollComponent,
    DashboardVerifComponent,
    CreateUserComponent,
     UploadFileComponent,
    ReclamationOperateurComponent,
      ClientOperateurComponent,
    // RtlComponent
  ]
})
export class AdminLayoutModule {}
