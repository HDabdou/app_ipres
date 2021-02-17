import { Component, OnInit } from "@angular/core";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import * as sha1 from 'js-sha1';
import { Router } from '@angular/router';
import {ReclamationItem} from './interfaces/interface.reclamation';

@Component({
  selector: "app-icons",
  templateUrl: "icons.component.html"
})
export class IconsComponent implements OnInit {

  datas : ReclamationItem[]= [
    {
      operateur: 'Magor Sy',
      operation: 'Retrait',
      date: '12-02-2020',
      etat:'corrigé'
    },
    {
      operateur: 'Adama Goudiaby',
      operation: 'Dépot',
      date: '13-03-2020',
      etat:'en attente'
    },
    {
      operateur: 'ABdule Hamide Dialo',
      operation: 'Paiemetraitment Facture',
      date: '15-04-2021',
      etat:'corrigé'
    },
    {
      operateur: 'Naby Ndiaye',
      operation: 'Dépot',
      date: '20-02-2020',
      etat:'en attente'
    },

  ]
  listLivreur:any = [];
  closeResult: string;
  selected:any = null;
  listLivraisonByLivreur:any =[];
  constructor(private _serviceAdmin:AdminService,private modalService: NgbModal,private router:Router) {}

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
updateUser(selected){
  this._serviceAdmin.updateUser({nom:selected.nom,prenom:selected.prenom,telephone:selected.telephone,adresse:selected.adresse,login:selected.login,password:sha1("1234"),nom_entreprise:"null",iduser:selected.iduser}).then(res=>{
    console.log(res);
    if(res['status'] == true){
      this.modalService.dismissAll()
      alert("Utilisateur mise à jour");
      this.selected = null;

    }else{
      this.modalService.dismissAll()
      alert("Erreur mise à jour");
    }
  })
}
deleteUser(id){
  console.log(id)
  if(confirm("Voulez vous supprimé ce Livreur ?")){
    this._serviceAdmin.deleteUser({iduser:id}).then(res=>{
      console.log(res);
      if(res['status'] == true){
        alert('Livreur supprimé')
        this.listLivreur = [];
        this._serviceAdmin.getLivreur().then(res=>{
          console.log(res);
          if(res['status'] == true){
            this.listLivreur = res['message']
            this.open('content')
          }
        })
      }else{
        alert("Suppression erreur");
      }
    })
  }
 
}

getLivraisonByLivreur(id){
  this.listLivraisonByLivreur= [];
  this._serviceAdmin.getLivraisonLivreur({iduser:id}).then(res=>{
    console.log(res);
    if(res['status'] = true){
      this.listLivraisonByLivreur = res['message'];
     
    }
  })
}
  ngOnInit() {
    if(localStorage.getItem("currentuser") == null){
      //this.router.navigate(['/']);
    }
    this.listLivreur = [];
    this._serviceAdmin.getLivreur().then(res=>{
      console.log(res);
      if(res['status'] == true){
        this.listLivreur = res['message']
      }
    })
  }
}
