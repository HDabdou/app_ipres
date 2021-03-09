import { Component, OnInit } from "@angular/core";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as sha1 from 'js-sha1';
import { Router } from '@angular/router';
import {DashboardItem} from '../interfaces/interface.dashboardItem';

@Component({
  selector: 'app-dashboard-verif',
  templateUrl: './dashboard-verif.component.html',
  styleUrls: ['./dashboard-verif.component.scss']
})
export class DashboardVerifComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
