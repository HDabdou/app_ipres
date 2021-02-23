import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"]
})
export class AdminLayoutComponent implements OnInit {
  public sidebarColor: string = "red";
  public profile = "";
  side = 'blue';
  constructor(private router:Router) {}
  changeSidebarColor(color){
    var sidebar = document.getElementsByClassName('sidebar')[0];
    var mainPanel = document.getElementsByClassName('main-panel')[0];
    


    this.sidebarColor = color;

    if(sidebar != undefined){
        sidebar.setAttribute('data',color);
    }
    if(mainPanel != undefined){
        mainPanel.setAttribute('data',color);
    }
  }
  content:string = 'white-content';
  changeDashboardColor(color){
    var body = document.getElementsByTagName('body')[0];
    if (body && color === 'white-content') {
        body.classList.add(color);
    }
    else if(body.classList.contains('white-content')) {
      body.classList.remove('white-content');
    }
  }
  ngOnInit() {
    this.changeDashboardColor(this.content);
    this.changeSidebarColor('red');
    /*this.profile = sessionStorage.getItem('profile');
    if(this.profile=='verificateur'){
      this.router.navigate(['/verificateur'])
    }
   if(this.profile=='client'){
      this.router.navigate(['/client'])
    }
    if(this.profile=='admin'){
      this.router.navigate(['/admin'])
    }
   if(this.profile=='operateur'){
      this.router.navigate(['/ClientOperateurComponent'])
    }*/
  }
}
