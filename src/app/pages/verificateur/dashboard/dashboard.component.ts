import { Component, OnInit } from "@angular/core";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import * as sha1 from 'js-sha1';
import { Router } from '@angular/router';
import {DashboardItem} from '../interfaces/interface.dashboardItem';
import { DashboardService } from 'src/app/services/verificateur/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponentVerif implements OnInit {
  dateDebut:'';
  dateFin='';

  nbrPenssionnaire = 0;
  soldeTotal = 0;
  datas : DashboardItem[]= [
  ]

  motcle = null;
  dataBase:DashboardItem[] = this.datas;

  searchAll = () => {
    let value = this.motcle;
    console.log("PASS", { value });
  
    const filterTable = this.dataBase.filter(o =>
      Object.keys(o).some(k =>
        String(o[k])
          .toLowerCase()
          .includes(value.toLowerCase())
      )
    );
  
    this.datas = filterTable;
  }
  
  listLivreur:any = [];
  closeResult: string;
  selected:any = null;
  listLivraisonByLivreur:any =[];
  constructor(private _serviceAdmin:AdminService,private modalService: NgbModal,private router:Router,private _dashService:DashboardService) {}

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
open(content) {
  this.modalService.open(content, {windowClass: 'modal-search'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}


parseDatas (dataRest):DashboardItem[]{
  let arr:DashboardItem[]=[];
  (dataRest.data).forEach(element => {
    arr.push({
      prenom:element.pensionnaire.prenom,
      nom:element.pensionnaire.nom,
      montant:element.paiement.montant,
      date:element.paiement.updated_at,
      tel:element.pensionnaire.telephone,
    });

  });
  this.calculeDash(dataRest.data);
  return arr;
}

calculeDash(data):any{
    
    (data).forEach(element => {
      this.soldeTotal += element.paiement.montant;
      this.nbrPenssionnaire += 1;
    });

}

rechercherInterval(debut,fin){
  this._dashService.getPaymentByInterval({debut:debut,fin:fin}).then(rep => {
    console.log(rep)
    this.dataBase= this.datas= this.parseDatas(rep);
  });
}

getDateNow(){
  let today = new Date();
  let dd = this.getDay(today);

  let mm = this.getMoth(today); 
  let yyyy = this.getYear(today);

  let day = dd+'/'+mm+'/'+yyyy;
  console.log(day);
  return day;
}

  getMoth(date){
    let mm = ""; 
    if(date.getMonth()<10) 
    {
        mm='0'+date.getMonth();
    }else{
      mm=''+date.getMonth();
    }

    return mm;
  }

  getDay(date){
    let dd = ""; 
    if(date.getDay()<10) 
    {
        dd='0'+date.getDate();
    } else{
      dd=''+date.getMonth();
    }

    return dd;
  }

  validerrechercherInterval (){
    this.soldeTotal = 0;
    this.nbrPenssionnaire = 0;
    let dateDebut = this.dateDebut.split('-');
    let dateFin = this.dateFin.split('-');

    this.rechercherInterval(dateDebut[2]+'/'+dateDebut[1]+'/'+dateDebut[0],dateFin[2]+'/'+dateFin[1]+'/'+dateFin[0]);
  }

  getYear(date){
    return date.getFullYear();
  }

  ngOnInit() {
    let today = new Date();
    
    let debut = this.getDay(today)+'/' + this.getMoth(today)+'/'+(this.getYear(today)-1);
    let fin = this.getDay(today)+'/' + this.getMoth(today)+'/'+(this.getYear(today)+1);

    this.rechercherInterval(debut,fin);
  }
}
