import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';



@Component({
  selector: "app-icons",
  templateUrl: "icons.component.html"
})
export class IconsComponent implements OnInit {

  constructor (private router:Router){

  }
  ngOnInit() {
    this.router.navigate(['/dashboardVerif'])
  }
}
