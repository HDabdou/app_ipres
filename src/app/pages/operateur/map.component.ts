import { Component, OnInit } from "@angular/core";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import * as sha1 from 'js-sha1';
import { Router } from '@angular/router';

declare const google: any;

interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}

@Component({
  selector: "app-map",
  templateUrl: "map.component.html"
})
export class MapComponent implements OnInit {
  listPro:any = [];
  closeResult: string;
  listLivraisonByLivreur:any =[]
  selected:any = null;

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
  this._serviceAdmin.updateUser({nom:selected.nom,prenom:selected.prenom,telephone:selected.telephone,adresse:selected.adresse,login:selected.login,password:sha1("1234"),nom_entreprise:selected.nom_entreprise,iduser:selected.iduser}).then(res=>{
    console.log(res);
    if(res['status'] == true){
      alert("Utilisateur mise à jour");
      this.selected = null;
     
    }else{
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
        alert('Corporate supprimé')
        this.listPro = [];
        this._serviceAdmin.getLivreur().then(res=>{
          console.log(res);
          if(res['status'] == true){
            this.listPro = res['message']
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
  this._serviceAdmin.getLivraisonPro({iduser:id}).then(res=>{
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
    this.listPro =[]
    this._serviceAdmin.getCorporate().then(res=>{
      console.log(res);
      if(res['status'] == true){
        this.listPro = res['message'];
      }
    })
  }
}
