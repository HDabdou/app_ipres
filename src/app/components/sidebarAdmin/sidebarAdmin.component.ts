import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  rtlTitle: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  /*{
    path: "/admin",
    title: "Tableau de bord",
    rtlTitle: "لوحة القيادة",
    icon: "icon-chart-pie-36",
    class: ""
  },
  { 
    path: "/createUse",
    title: "Création compte",
    rtlTitle: "الرموز",
    icon: "icon-single-02",
    class: ""
  },
  {
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
  },*/
  //admin
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
    icon: "icon-paper",
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
export const ROUTESADMIN: RouteInfo[] = [
  {
    path: "/admin",
    title: "Tableau de bord",
    rtlTitle: "لوحة القيادة",
    icon: "icon-chart-pie-36",
    class: ""
  },
  { 
    path: "/createUse",
    title: "Création compte",
    rtlTitle: "الرموز",
    icon: "icon-single-02",
    class: ""
  },
  {
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
]
export const ROUTEOPERATEUR: RouteInfo[] = [
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
    icon: "icon-paper",
    class: ""
  },
]
@Component({
  selector: "app-sidebar-admin",
  templateUrl: "./sidebarAdmin.component.html",
  styleUrls: ["./sidebarAdmin.component.css"]
})
export class SidebarAdminComponent implements OnInit {
  menuItems: any[];
  profile 
  constructor() {}

  ngOnInit() {
    this.profile = localStorage.getItem('profile');
    if(this.profile == 'admin'){
      this.menuItems = ROUTESADMIN.filter(menuItem => menuItem);
    }
    if(this.profile == 'operateur'){
      this.menuItems = ROUTEOPERATEUR.filter(menuItem => menuItem);
    }
    //this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
