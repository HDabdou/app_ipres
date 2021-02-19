import { Component, OnInit } from "@angular/core";

import { ServiceItem } from '../interfaces/interface.service';
@Component({
  selector: 'app-services-make-place',
  templateUrl: './services-make-place.component.html',
  styleUrls: ['./services-make-place.component.scss']
})
export class ServicesMakePlaceComponent implements OnInit {

  constructor() { }
  datas : ServiceItem[]= [
    {
      nom: 'Retrait',
      description:'Rétirez votre argents en toute sécurité',
      text:"Faire l'Opération"
    },
    {
      nom: 'Envoi',
      description:'Envoyez votre argents en toute sécurité',
      text:"Faire l'Opération"

    },
    {
      nom: 'Paiement Facture',
      description:'Payez vos factures en restant chez vous',
      text:"Faire l'Opération"

    },
    {
      nom: 'Paiement',
      description:'Faite vos paiement sans vous déplacez',
      text:"Faire l'Opération"

    },

  ]
  ngOnInit() {

  }

}
