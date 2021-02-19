import { Component, OnInit } from "@angular/core";

import { ServiceItem } from '../interfaces/interface.service';

@Component({
  selector: 'app-services-sentoll',
  templateUrl: './services-sentoll.component.html',
  styleUrls: ['./services-sentoll.component.scss']
})
export class ServicesSentollComponent implements OnInit {

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
