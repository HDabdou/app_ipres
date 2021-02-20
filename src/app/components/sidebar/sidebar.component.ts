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
    path: "/admin",
    title: "Admin maker",
    rtlTitle: "لوحة القيادة",
    icon: "icon-chart-pie-36",
    class: ""
  },
  { 
    path: "/verificateur",
    title: "Vérificateur",
    rtlTitle: "الرموز",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/operateur",
    title: "Opérateur",
    rtlTitle: "خرائط",
    icon: "icon-bank",
    class: "" },
  {
    path: "/client",
    title: "Client",
    rtlTitle: "إخطارات",
    icon: "icon-align-left-2",
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

export const ROUTES_VERIFICATEUR: RouteInfo[] = [
  {
    path: "/reclamation",
    title: "Réclamation",
    rtlTitle: "لوحة القيادة",
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

];

export const ROUTES_CLIENT: RouteInfo[] = [

  { 
    path: "/operationsSentool",
    title: "Opérations Sentool",
    rtlTitle: "الرموز",
    icon: "icon-chart-pie-36",
    class: ""
  },
  
  {
    path: "/servicesSentool",
    title: "Services Sentoll",
    rtlTitle: "خرائط",
    icon: "icon-bank",
    class: "" 
  },
  {
    path: "/servicesMakePlace",
    title: "Services Make Place",
    rtlTitle: "خرائط",
    icon: "icon-bank",
    class: "" 
  },
  

  
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
    path: "/reclamationAdmin",
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
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}
  profile
  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.profile = sessionStorage.getItem('profile');
    if(this.profile == 'verificateur'){
      this.menuItems = ROUTES_VERIFICATEUR.filter(menuItem => menuItem);
    }
    if(this.profile =='client'){
      this.menuItems = ROUTES_CLIENT.filter(menuItem => menuItem);
    }
    if(this.profile == 'admin'){
      this.menuItems = ROUTESADMIN.filter(menuItem => menuItem);
    }
    if(this.profile == 'operateur'){
      this.menuItems = ROUTEOPERATEUR.filter(menuItem => menuItem);
    }

  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
