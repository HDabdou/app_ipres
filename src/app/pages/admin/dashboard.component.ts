import { Component, OnInit } from "@angular/core";
import { AdminService } from 'src/app/services/admin.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as sha1 from 'js-sha1';
import { Router } from '@angular/router';
import { AdminMakerService } from "src/app/services/admin-maker.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  styleUrls: ['./dashboard.component.scss']

})
export class DashboardComponent implements OnInit {
  public canvas : any;
  public ctx;
  public datasets: any;
  public data: any;
  public myChartData;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;
  patients:any = [];
  nbrUsers:number = 0;
  closeResult: string;
  selected:any;
  symptomes:any=[];
  nbrSymptomes:number = 0;
  listLivreur=[];
  idLivreuer:any = ""
  etap=1;
  prenom
  nom
  tel;
  adresse;
  login
  password
  typeUtilasateur
  nom_entreprise
  listeLivraison:any =[]

  etapCreation = 1;
  itemsPerPage
  paiements = []
  listUser = [];
  listeTodisplay = []
  constructor(private toastr: ToastrService,private _adminService:AdminMakerService,private modalService: NgbModal,private router:Router) {}
  //Pour Fitrer sur toutes le clonne 
  motcle
  searchAll = () => {
    
    let value = this.motcle;
    const filterTable = this.paiements.filter(o =>
      Object.keys(o).some(k =>
        String(o[k])
          .toLowerCase()
          .includes(value.toLowerCase())
      )
    );
    this.listeTodisplay = filterTable;
  }



  reinitialisation(){
    this.prenom = undefined;
    this.nom = undefined;
    this.tel = undefined;
    this.adresse = undefined;
    this.login = undefined;
    this.password = undefined;
    this.nom_entreprise = undefined;
  }
//Pour modal
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
 
 
  
 //Pour l'affichage des dates
  displayDate(date){ 
    if(date != ""){
      return new Date(date).toLocaleString();
    }
    
  }
 
errorMessage:number = 0
nbrNouveau:number = 0;
nbrAssigne:number = 0;
nbrLivre:number = 0;
nbrCenlevement:number = 0;
nbrCLivraison:number = 0;
nbrretour:number = 0;
nbrAnnuler:number = 0;
dateDebut;
dateFin;
nombrePaiements = 0;
montantPaiement = 0;
moisEnLettre = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
//Pour l'affichage des moi en lettre
displayMonth(arg){
  let i = parseInt(arg) -1
  return this.moisEnLettre[0]
}
//recherche pour le dashboed des paiements par intervalle de date
recherche(){
  this.nombrePaiements = 0;
    this.montantPaiement = 0;
  //inversion ou pour formatage pour le besoins du backend
  let dd = this.dateDebut.split('-')[2]+"/"+this.dateDebut.split('-')[1]+"/"+this.dateDebut.split('-')[0]
  let df = this.dateFin.split('-')[2]+"/"+this.dateFin.split('-')[1]+"/"+this.dateFin.split('-')[0]

  this._adminService.getPaymentByInterval({debut:dd,fin:df}).then(res=>{
     this.paiements = res['data'].reverse();
     this.nombrePaiements = res['data'].length;
    
    this.listeTodisplay = this.paiements
    
    for(let i of this.paiements){
      this.montantPaiement = this.montantPaiement + parseInt(i.paiement.montant)
    }
    this.startloader("Recherche terminé")
  })
}
currencyFormat(somme) : String{
  return Number(somme).toLocaleString() ;
}
  ngOnInit() {
    let dd1 = new Date();
    let d = dd1.setDate(-30);
    this.dateDebut = new Date(dd1).toJSON().split("T")[0]
    this.dateFin = new Date().toJSON().split("T")[0]
    
    console.log(dd1.toJSON().split("T")[0])
    let dd = this.dateDebut.split('-')[2]+"/"+this.dateDebut.split('-')[1]+"/"+this.dateDebut.split('-')[0]
    let df = this.dateFin.split('-')[2]+"/"+this.dateFin.split('-')[1]+"/"+this.dateFin.split('-')[0]

    this._adminService.getPaymentByInterval({debut:dd,fin:df}).then(res=>{
      this.paiements = res['data'].reverse();
      this.nombrePaiements = res['data'].length;
      
      this.listeTodisplay = this.paiements
      
      for(let i of this.paiements){
        this.montantPaiement = this.montantPaiement + parseInt(i.paiement.montant)
      }
    })


  }
  displayAnneeMois(arg,nom){
    if(nom == "annee"){
      return arg.split("-")[0];
    }
    if(nom == "mois"){
      return arg.split("-")[1];
    }
    return "";
  }
  startloader(message){   
    this.toastr.info('<span class="tim-icons icon-check-2" [data-notify]="icon"></span>  <b>IPRES</b> - '+message, '', {
       disableTimeOut: true,
       closeButton: true,
       enableHtml: true,
       toastClass: "alert alert-success alert-with-icon",
       positionClass: 'toast-top-center'
     });    
}


}
