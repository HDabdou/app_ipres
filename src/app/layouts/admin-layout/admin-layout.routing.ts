import { Routes } from "@angular/router";

import { DashboardComponent } from "src/app/pages/admin/dashboard.component";
import { IconsComponent } from "src/app/pages/verificateur/icons.component";
import { UserComponent } from "src/app/pages/user/user.component";
import { TablesComponent } from "src/app/pages/tables/tables.component";
import { TypographyComponent } from "src/app/pages/typography/typography.component";
import { MapComponent } from "src/app/pages/operateur/map.component";
import { NotificationsComponent } from "src/app/pages/client/notifications.component";
import { DashboardComponent as DashboardComponentVerif} from "../../pages/verificateur/dashboard/dashboard.component";
import { OperationsComponent } from "../../pages/verificateur/operations/operations.component";


// import { RtlComponent } from "src/app/pages/pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [
  

  { path: "admin", component: DashboardComponent },
  { path: "verificateur", component: IconsComponent },
  { path: "operateur", component: MapComponent },
  { path: "client", component: NotificationsComponent },
  { path: "user", component: UserComponent },
  { path: "tables", component: TablesComponent },
  { path: "typography", component: TypographyComponent },
  { path: "dashboardVerif", component: DashboardComponentVerif },
  { path: "operations", component: OperationsComponent },
  // { path: "rtl", component: RtlComponent }
];
