import { Component, OnInit } from "@angular/core";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ServiceItem } from '../interfaces/interface.service';

@Component({
  selector: 'app-services-sentoll',
  templateUrl: './services-sentoll.component.html',
  styleUrls: ['./services-sentoll.component.scss']
})
export class ServicesSentollComponent implements OnInit {
  serviceTitre='Rerait';
  serveForm='transfert';


  constructor(private modalService: NgbModal) { }
  closeResult: string;
  datas : ServiceItem[]= [
    {
      nom: 'Retrait',
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
      nom: 'Abonement Tv',
      description:'Abonnez-vous a vos bouquets',
      text:"Faire l'Opération"

    },
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
  ngOnInit() {

  }

}
