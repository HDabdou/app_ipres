import { Routes } from "@angular/router";

import { DashboardComponent } from "src/app/pages/admin/dashboard.component";
import { IconsComponent } from "src/app/pages/verificateur/icons.component";
import { UserComponent } from "src/app/pages/user/user.component";
import { TablesComponent } from "src/app/pages/tables/tables.component";
import { TypographyComponent } from "src/app/pages/typography/typography.component";
import { MapComponent } from "src/app/pages/operateur/map.component";
import { NotificationsComponent } from "src/app/pages/client/notifications.component";
import {  DashboardComponentVerif} from "../../pages/verificateur/dashboard/dashboard.component";
import { OperationsComponent } from "../../pages/verificateur/operations/operations.component";
import { ValidationOpsComponent  } from "../../pages/verificateur/validation-ops/validation-ops.component";
import { ReclamationComponent } from 'src/app/pages/verificateur/reclamation/reclamation.component';
import { ServicesSentollComponent } from 'src/app/pages/client/services-sentoll/services-sentoll.component';
import { ServicesMakePlaceComponent } from 'src/app/pages/client/services-make-place/services-make-place.component';
import { OperationsSentollComponent } from 'src/app/pages/client/operations-sentoll/operations-sentoll.component';


// import { RtlComponent } from "src/app/pages/pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [
  

  { path: "admin", component: DashboardComponent },
  { path: "verificateur", component: IconsComponent },
  { path: "operateur", component: MapComponent },
  { path: "client", component: NotificationsComponent },
  { path: "user", component: UserComponent },
  { path: "tables", component: TablesComponent },
  { path: "typography", component: TypographyComponent },
  { path: "reclamation", component: ReclamationComponent },
  { path: "dashboardVerif", component: DashboardComponentVerif },
  { path: "validationsOps", component: ValidationOpsComponent },
  { path: "servicesSentool", component: ServicesSentollComponent },
  { path: "servicesMakePlace", component: ServicesMakePlaceComponent },
  { path: "operations", component: OperationsSentollComponent },

  // { path: "rtl", component: RtlComponent }
];
