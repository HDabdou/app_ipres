import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { IconsComponent } from "../../pages/verificateur/icons.component";
import { NotificationsComponent } from "../../pages/client/notifications.component";
import { ReclamationComponent } from "../../pages/verificateur/reclamation/reclamation.component";
import { OperationsComponent } from "../../pages/verificateur/operations/operations.component";
import { DashboardComponentVerif} from "../../pages/verificateur/dashboard/dashboard.component";
import { ValidationOpsComponent  } from "../../pages/verificateur/validation-ops/validation-ops.component";
import { ServicesSentollComponent } from 'src/app/pages/client/services-sentoll/services-sentoll.component';
import { ServicesMakePlaceComponent } from 'src/app/pages/client/services-make-place/services-make-place.component';
import { OperationsSentollComponent } from 'src/app/pages/client/operations-sentoll/operations-sentoll.component';
// import { RtlComponent } from "../../pages/rtl/rtl.component";


import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HistorMarketComponent } from "src/app/pages/client/histor-market/histor-market.component";

import { CreateUserComponent } from "src/app/pages/admin/create-user/create-user.component";
import { UploadFileComponent } from "src/app/pages/admin/upload-file/upload-file.component";
import { ReclamationOperateurComponent } from "src/app/pages/operateur/reclamation-operateur/reclamation-operateur.component";
import { ClientOperateurComponent } from "src/app/pages/operateur/client-operateur/client-operateur.component";

import { NgxPaginationModule } from 'ngx-pagination';
import { AdminReclamationComponent } from "src/app/pages/admin/admin-reclamation/admin-reclamation.component";

import { UploadPensionnaireComponent } from "src/app/pages/admin/upload-pensionnaire/upload-pensionnaire.component";
import { DashbordAdminComponent } from "src/app/pages/admin/dashbord-admin/dashbord-admin.component";
import { DashboardVerifComponent } from "src/app/pages/verificateur/dashboard-verif/dashboard-verif.component";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgxPaginationModule,

  ],
  declarations: [
    IconsComponent,
    NotificationsComponent,
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
      AdminReclamationComponent,
      UploadPensionnaireComponent,
      HistorMarketComponent,
      DashbordAdminComponent
      
    // RtlComponent
  ]
})
export class AdminLayoutModule {}
