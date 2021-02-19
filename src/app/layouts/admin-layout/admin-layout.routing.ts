import { Routes } from "@angular/router";

import { DashboardComponent } from "src/app/pages/admin/dashboard.component";
import { IconsComponent } from "src/app/pages/verificateur/icons.component";
import { UserComponent } from "src/app/pages/user/user.component";
import { TablesComponent } from "src/app/pages/tables/tables.component";
import { TypographyComponent } from "src/app/pages/typography/typography.component";
import { MapComponent } from "src/app/pages/operateur/map.component";
import { NotificationsComponent } from "src/app/pages/client/notifications.component";
import { CreateUserComponent } from "src/app/admin/create-user/create-user.component";
import { UploadFileComponent } from "src/app/admin/upload-file/upload-file.component";
import { ReclamationComponent } from "src/app/admin/reclamation/reclamation.component";
import { ReclamationOperateurComponent } from "src/app/operateur/reclamation-operateur/reclamation-operateur.component";
import { ClientOperateurComponent } from "src/app/operateur/client-operateur/client-operateur.component";
// import { RtlComponent } from "src/app/pages/pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [
  

  { path: "admin", component: DashboardComponent },
  { path: "createUse", component: CreateUserComponent },
  { path: "uploadFile", component: UploadFileComponent },
  { path: "reclamation", component: ReclamationComponent },
  
  { path: "clientOperateur", component: ClientOperateurComponent },
  { path: "reclamationOperateur", component: ReclamationOperateurComponent },
  



  { path: "verificateur", component: IconsComponent },
  { path: "operateur", component: MapComponent },
  { path: "client", component: NotificationsComponent },
  { path: "user", component: UserComponent },
  { path: "tables", component: TablesComponent },
  { path: "typography", component: TypographyComponent },
  // { path: "rtl", component: RtlComponent }
];
