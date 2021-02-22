import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminMakerService } from 'src/app/services/admin-maker.service';
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
  listeReclamation = [];
  listeOperation = []
  constructor(private modalService: NgbModal,private router:Router,private _serviceOperateur:AdminMakerService) {}

  selected
  validerParamMontant(){
    if(this.selected != undefined){
      this.selected.montant = this.paramMontant;
    }
    this.paramMontant = undefined;
  }
  listeClient = [
   
  ]
  validerAddReclamation(){
    this._serviceOperateur.initReclamation({idInitiateur:4,code:this.idclient,description:this.description,idOperation:this.idoperation }).then(res=>{
      console.log(res)
    })
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
  idoperation;
  addLigne(){
    this.annee = new Date(this.date).toJSON().split('T')[0][0];
    this.mois = new Date(this.date).toJSON().split('T')[0][1];
    console.log({prenom:this.prenom,nom:this.nom,telephone:this.tel,montant:this.montant,annee:this.annee,mois:this.mois})
    //this.listeExcel.push({prenom:this.prenom,nom:this.nom,telephone:this.tel,montant:this.montant,annee:this.annee,mois:this.mois});

  }
  getCLientByOperateur(){
    this._serviceOperateur.getUserByOperateur({idCreateur:4}).then(res=>{
      console.log(res)
      this.listeClient = res['data'];
    })
  }
  getOperationByClient(){
    console.log(this.idclient)
    this._serviceOperateur.getOperationByClient({code:this.idclient}).then(res =>{
      console.log(res)
      this.listeOperation = res['data'];
    })
  }
  moisEnLettre = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  displayMonth(arg){
    let i = parseInt(arg) -1
    return this.moisEnLettre[0]
  }
  updateReclamation1(){
    this._serviceOperateur.updateReclamationOp({id:4,description:this.description}).then(res=>{
      console.log(res)
    })
  }
  ngOnInit(): void {
    this._serviceOperateur.getReclamationByOperateur({idInitiateur:4}).then(res=>{
      this.listeReclamation= res['data'];
    })
  }

}
