import { Routes } from "@angular/router";

import { IconsComponent } from "src/app/pages/verificateur/icons.component";
import { NotificationsComponent } from "src/app/pages/client/notifications.component";
import { CreateUserComponent } from "src/app/pages/admin/create-user/create-user.component";
import { UploadFileComponent } from "src/app/pages/admin/upload-file/upload-file.component";
import { ReclamationOperateurComponent } from "src/app/pages/operateur/reclamation-operateur/reclamation-operateur.component";
import { ClientOperateurComponent } from "src/app/pages/operateur/client-operateur/client-operateur.component";
import { DashboardComponentVerif} from "../../pages/verificateur/dashboard/dashboard.component";
import { OperationsComponent } from "../../pages/verificateur/operations/operations.component";
import { ValidationOpsComponent  } from "../../pages/verificateur/validation-ops/validation-ops.component";
import { ServicesSentollComponent } from 'src/app/pages/client/services-sentoll/services-sentoll.component';
import { ServicesMakePlaceComponent } from 'src/app/pages/client/services-make-place/services-make-place.component';
import { OperationsSentollComponent } from 'src/app/pages/client/operations-sentoll/operations-sentoll.component';
import { ReclamationComponent } from "src/app/pages/verificateur/reclamation/reclamation.component";
import { AdminReclamationComponent } from "src/app/pages/admin/admin-reclamation/admin-reclamation.component";
import { UploadPensionnaireComponent } from "src/app/pages/admin/upload-pensionnaire/upload-pensionnaire.component";
import { HistorMarketComponent } from 'src/app/pages/client/histor-market/histor-market.component';
import { DashbordAdminComponent } from "src/app/pages/admin/dashbord-admin/dashbord-admin.component";


// import { RtlComponent } from "src/app/pages/pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [
  

  { path: "admin", component: DashbordAdminComponent },
  { path: "createUse", component: CreateUserComponent },
  { path: "uploadFile", component: UploadFileComponent },
  { path: "reclamationAdmin", component: AdminReclamationComponent },
  { path: "clientOperateur", component: ClientOperateurComponent },
  { path: "reclamationOperateur", component: ReclamationOperateurComponent },
  { path: "uploadPensionnaire", component: UploadPensionnaireComponent},
  { path:"operations",component:OperationsComponent},
  { path: "verificateur", component: IconsComponent },
  { path: "client", component: NotificationsComponent },
  { path: "reclamation", component: ReclamationComponent },
  { path: "dashboardVerif", component: DashboardComponentVerif },
  { path: "validationsOps", component: ValidationOpsComponent },
  { path: "servicesSentool", component: ServicesSentollComponent },
  { path: "servicesMakePlace", component: ServicesMakePlaceComponent },
  { path: "operationsSentool", component: OperationsSentollComponent },
  { path: "historMarket", component: HistorMarketComponent },

  // { path: "rtl", component: RtlComponent }
];
