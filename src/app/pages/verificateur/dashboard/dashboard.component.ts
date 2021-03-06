import { Component, OnInit } from "@angular/core";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  dateDebut:''; // La date de début pour la recherche par interval
  dateFin=''; // La date de fin pour la recherche par interval
  


  public nbrPenssionnaire = 0; //Nombre total de penssionnaires
  public soldeTotal = 0; //solde total 

  datas : DashboardItem[]= [] // listes les pensions (affichée aprés filtre)



  motcle = null; // mot clé cherchercher dans les liste des pensions pour le filtre du taleau 

  dataBase:DashboardItem[] = this.datas; // liste des pensions (sauvegarde de la liste sans filtre)

  /* recherche des pensions contenant le mot clé recherché;
   * renvoie la liste conténant le mot clé
   * ne prend aucun parametre
   */
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
  
  closeResult: string; // resultat aprés  fermeture  du modal 
  selected:any = null; // element choisi dans la liste de pensions

  /* 
  * constructeur de la class
  * initialisation des differents services et attibuts de la classe
  */
  constructor(private modalService: NgbModal,private router:Router,private _dashService:DashboardService) {}

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  /* 
   Ouvrir un modal
   content => identifiant du modal
  */
open(content) {
  this.modalService.open(content, {windowClass: 'modal-search'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

/* 
   formater les données reçus apres requete htttp
   dataRest =>  données reçus
   arr =>  résultat du formatage (tableau des pensions)
*/

parseDatas (dataRest):DashboardItem[]{
  let arr:DashboardItem[]=[];
  ((dataRest.data).reverse()).forEach(element => {
    arr.push({
      prenom:element.pensionnaire.prenom,
      nom:element.pensionnaire.nom,
      montant:element.paiement.montant,
      date: (new Date(element.paiement.updated_at)).toLocaleDateString(),
      tel:element.pensionnaire.telephone,
    });
    
  });
  return arr;
}


/* 
   calcul du solde total des pensions et du nombres de pensionnaires
*/
calculeDash(data):any{
  console.log(data)
    let solde  = 0;
    let nbr = 0;
    (data).forEach(element => {
      solde += element.montant;
      nbr += 1;
    });
    
    this.soldeTotal = solde;
    this.nbrPenssionnaire = data.lenth;
    console.log(this.soldeTotal)
    console.log(this.nbrPenssionnaire)
}

GoptimusBarCharts = [
  {
    name:"semaine 1",
    percentage: 20
  },
  {
    name:"semaine 2",
    percentage: 10
  },
  {
    name:"semaine 3",
    percentage: 30
  },
  {
    name:"semaine 4",
    percentage: 40
  },
]


barChartsDatas(datas){
  let month:number = ((new Date()).getMonth()) + 1;
  let mm:number;
  let dd:number;
  let totalMontant = 0;
  let totalNbr = 0;

  this.dataBase.forEach(element => {
    mm = ((new Date(element.date)).getMonth());
    dd = ((new Date(element.date)).getDay());
    if(mm==month){
      if(dd<=7){
        (this.GoptimusBarCharts[0]).percentage += element.montant;
      }else if(dd>7 && dd <=14){
        (this.GoptimusBarCharts[1]).percentage += element.montant;
      }
      else if(dd>14 && dd <=23){
        (this.GoptimusBarCharts[2]).percentage += element.montant;
      }
      else if(dd>23 && dd <=31){
        (this.GoptimusBarCharts[3]).percentage += element.montant;
      }
    }

    totalMontant += element.montant;

  });



  console.log(this.GoptimusBarCharts)
}



/* 
   function de recuperation des pensions par interval de dates 
*/
rechercherInterval(debut,fin){
  this._dashService.getPaymentByInterval({debut:debut,fin:fin}).then(rep => {
    console.log(rep)
    this.dataBase= this.datas= this.parseDatas(rep);
    this.barChartsDatas(this.dataBase);
  });
}

// La date actuél dans le format dd/mm/yyyy;
getDateNow(){
  let today = new Date();
  let dd = this.getDay(today);

  let mm = this.getMoth(today); 
  let yyyy = this.getYear(today);

  let day = dd+'/'+mm+'/'+yyyy;
  console.log(day);
  return day;
}
  /* le mois de la reçu en parametre
  *  reçoi une date en parametres
  *  returne le mois 
  */ 

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

  /* le jour de la reçu en parametre
  *  reçoi une date en parametres
  *  returne le jour 
  */ 
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

  /* le mois de la reçu en parametre
  *  reçoi une date en parametres
  *  returne le mois 
  */ 

  /* 
  * function appelée pour valider l'interval des dates choisi
  */

  validerrechercherInterval (){
    let dateDebut = this.dateDebut.split('-');
    let dateFin = this.dateFin.split('-');

    this.rechercherInterval(dateDebut[2]+'/'+dateDebut[1]+'/'+dateDebut[0],dateFin[2]+'/'+dateFin[1]+'/'+dateFin[0]);
  }

  /* le Année de la reçu en parametre
  *  reçoi une date en parametres
  *  returne le Année 
  */


  getYear(date){
    return date.getFullYear();
  }

  ngOnInit() {
    let today = new Date();
    let debut = '01/01/'+this.getYear(today);
    let fin = '31/12/'+this.getYear(today);

    this.rechercherInterval(debut,fin);

  
  }
}
