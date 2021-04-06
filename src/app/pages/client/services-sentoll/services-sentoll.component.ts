import { Component, OnInit } from "@angular/core";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceSentoolService } from 'src/app/services/client/service-sentool.service';

import { ServiceItem } from '../interfaces/interface.service';

@Component({
  selector: 'app-services-sentoll',
  templateUrl: './services-sentoll.component.html',
  styleUrls: ['./services-sentoll.component.scss']
})
export class ServicesSentollComponent implements OnInit {
  serviceTitre='Rerait';
  serveForm='transfert';
  numeroDepot= null;
  montantDepot = null;
  walletDepot = null;
  loader = false;
  acte = null;
  dateEffet = null;
  duree = null; 
  montant = null;
  puissance = null;
  nbrPlace = null;
  imatriculation =null;
  categVehicule=null;
  valeurVenal=null;
  assitanceJudiciaire=null;
  avanceDeFont=null;
  marque = null;
  model = null;
  nomPrenom = null
  adresse = null;
  ville = null;
  activite = null;
  telephone = null;
  success = null;
  currier = null;
  metier = null;
  numCompte = null;
  service = null;
  constructor(private modalService: NgbModal,private _servSentool:ServiceSentoolService) { }
  closeResult: string;
  prepaye = false;
  paiementFacture = true;
  suivantVarAssurance="1";

  datas : ServiceItem[]= [
    {
      nom: 'Approvisionnement',
      description:'Rétirez votre argents en toute sécurité',
      text:"Faire l'Opération"
    },
    {
      nom: 'Transfert',
      description:'Faite vos paiement sans vous déplacez',
      text:"Faire l'Opération"

    },
    {
      nom: 'Paiement Facture',
      description:'Payez vos factures en restant chez vous',
      text:"Faire l'Opération"

    },
    {
      nom: 'Recharge Bancaire',
      description:'Rechager votre compte Bancaire en tout sécurité',
      text:"Faire l'Opération"

    },
    {
      nom: 'Abonnement Tv',
      description:'Abonnez-vous a vos bouquets',
      text:"Faire l'Opération"

    }
    ,
    {
      nom: 'Assurance',
      description:"Qui en a pas besoin ?",
      text:"Faire l'Opération"

    },

    
  ]


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  /**
   * @function : Ouvrir un modal
   * @param content : identifiant du modal
   * @param nom : nom du l'opération 
  */

  open(content,nom) {
    this.modalService.open(content, {windowClass: 'modal-search'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
      this.serviceTitre = nom;
      this.serveForm = nom;
    return false;
  }

  /**
   * @function : selection une option prépayé (Radio)
   * @param event : Objet
  */
  checkedRadioPrepaye(event){
    this.prepaye = true;
    this.paiementFacture = false;
  }

  /**
   * @function : selection une option paiement Facture (Radio)
   * @param event : Objet
  */
  checkedRadioPaiementFacture(event){
    this.paiementFacture = true;
    this.prepaye = false;
  }

  /**
   * @function : daire un depot
  */
  depot(){
    this._servSentool.depot({service: this.walletDepot,operation:'depot' , numero:this.numeroDepot,montant:this.montantDepot,code:'1134'}).then(rep => {
      console.log(rep)
      if(rep.statut==1){
        this.loader = null;
        this.success = true;
      }else{
        this.loader = false;
        this.success = null;
        alert("Une erruer s'est produit")
      }
    });
  }


  /**
   * @function : Passer au formulaire suivant (Assurance)
  */
  suivantAssurance (){
    this.suivantVarAssurance = "2";
  }

  /**
   * @function : Retour au formulaire suivant
  */
  retourAssurance (){
    this.suivantVarAssurance = "1";
  }

  ngOnInit() {

  }

}
