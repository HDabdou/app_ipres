import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-reclamation-operateur',
  templateUrl: './reclamation-operateur.component.html',
  styleUrls: ['./reclamation-operateur.component.scss']
})
export class ReclamationOperateurComponent implements OnInit {
  etapCreation = 1;
  listUser = [];
  prenom
  nom
  tel;
  montant
  date
  typeUtilasateur
  errorMessage = 0;
  closeResult: string;
  paramMontant
  description
  idclient
  listeReclamation = [
    {prenom:"Abdou",nom:"Diouf",telephone:"779632541",description:"sa réclamation",etat:1}
  ];
  constructor(private modalService: NgbModal,private router:Router) {}

  selected
  validerParamMontant(){
    if(this.selected != undefined){
      this.selected.montant = this.paramMontant;
    }
    this.paramMontant = undefined;
  }
  listeClient = [
    {id:1,prenom:"Abdou",nom:"Fall",telephone:"779863241"},
    {id:2,prenom:"Fatou",nom:"Diaw",telephone:"779811241"},
    {id:3,prenom:"Modou",nom:"Ndiaye",telephone:"773363241"},
    {id:4,prenom:"Abdou",nom:"Lo",telephone:"777863241"},
  ]
  validerAddReclamation(){
    for(let i of this.listeClient){
      if(i.id == this.idclient){
        this.selected = i;
      }
    }
    this.listeReclamation.push({prenom:this.selected.prenom,nom:this.selected.nom,telephone:this.selected.telephone,description:this.description,etat:0})
  }

  reinitialisation(){
    this.prenom = undefined;
    this.nom = undefined;
    this.tel = undefined;
    this.montant = undefined;
    this.date = undefined;
  }
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
  annee
  mois:any;
  addLigne(){
    this.annee = new Date(this.date).toJSON().split('T')[0][0];
    this.mois = new Date(this.date).toJSON().split('T')[0][1];
    console.log({prenom:this.prenom,nom:this.nom,telephone:this.tel,montant:this.montant,annee:this.annee,mois:this.mois})
    //this.listeExcel.push({prenom:this.prenom,nom:this.nom,telephone:this.tel,montant:this.montant,annee:this.annee,mois:this.mois});

  }


  ngOnInit(): void {
  }

}
