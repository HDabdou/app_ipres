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
    path: "/reclamation",
    title: "Réclamation",
    rtlTitle: "لوحة القيادة",
    icon: "icon-chart-pie-36",
    class: ""
  },
  { 
    path: "/operations",
    title: "Opérations",
    rtlTitle: "الرموز",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/validationsOps",
    title: "Validations",
    rtlTitle: "إخطارات",
    icon: "icon-align-left-2",
    class: ""
  },
  {
    path: "/dashboardVerif",
    title: "Tableau De Bord",
    rtlTitle: "خرائط",
    icon: "icon-bank",
    class: "" 
  },


 /* {
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
  selector: "app-sidebarClients",
  templateUrl: "./sidebarClients.component.html",
  styleUrls: ["./sidebarClients.component.css"]
})
export class SidebarClientsComponent implements OnInit {
  menuItems: any[
    
  ];

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
