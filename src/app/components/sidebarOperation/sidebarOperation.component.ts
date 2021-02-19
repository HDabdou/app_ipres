import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  rtlTitle: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/clientOperateur",
    title: "Création client",
    rtlTitle: "لوحة القيادة",
    icon: "icon-single-02",
    class: ""
  },
  { 
    path: "/reclamationOperateur",
    title: "Réclamation",
    rtlTitle: "الرموز",
    icon: "icon-single-02",
    class: ""
  },
 /* {
    path: "/uploadFile",
    title: "Importer paiement",
    rtlTitle: "خرائط",
    icon: "icon-cloud-upload-94",
    class: ""
   },

  {
    path: "/reclamation",
    title: "Réclamations",
    rtlTitle: "إخطارات",
    icon: "icon-paper",
    class: ""
  },

  {
    path: "/user",
    title: "User Profile",
    rtlTitle: "ملف تعريفي للمستخدم",
    icon: "icon-single-02",
    class: ""
  },
  {
    path: "/tables",
    title: "Table List",
    rtlTitle: "قائمة الجدول",
    icon: "icon-puzzle-10",
    class: ""
  },
  {
    path: "/typography",
    title: "Typography",
    rtlTitle: "طباعة",
    icon: "icon-align-center",
    class: ""
  },
  {
    path: "/rtl",
    title: "RTL Support",
    rtlTitle: "ار تي ال",
    icon: "icon-world",
    class: ""
  }*/
];

@Component({
  selector: "app-sidebar-operation",
  templateUrl: "./sidebarOperation.component.html",
  styleUrls: ["./sidebarOperation.component.css"]
})
export class SidebarOperationComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
