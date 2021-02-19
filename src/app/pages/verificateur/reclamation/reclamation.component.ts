import { Component, OnInit } from "@angular/core";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import * as sha1 from 'js-sha1';
import { Router } from '@angular/router';
import {ReclamationItem} from '../interfaces/interface.reclamation';
import {ReclamationService} from '../../../services/verificateur/reclamation.service';



@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.scss']
})
export class ReclamationComponent implements OnInit {


  datas : ReclamationItem[]= [
    {
      nom: 'Magor Sy',
      prenom: 'Sy',
      descrition:'description de la reclamation',
      date: '12-02-2020',
      etat:'corrigé'
    },
    {
      nom: 'Adama Goudiaby',
      prenom: 'Goudiaby',
      descrition:'description de la reclamation',
      date: '13-03-2020',
      etat:'en attente'
    },
    {
      nom: 'ABdule Hamide Dialo',
      prenom: 'Paiemetraitment Facture',
      descrition:'description de la reclamation',
      date: '15-04-2021',
      etat:'corrigé'
    },
    {
      nom: 'Naby Ndiaye',
      prenom: 'Dépot',
      descrition:'description de la reclamation',
      date: '20-02-2020',
      etat:'en attente'
    },

  ]

  chechedsItems = [];

  motcle = null;
  dataBase:ReclamationItem[] = this.datas;

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
    console.log('salut boy na  whhd')
  }


  listLivreur:any = [];
  closeResult: string;
  selected:any = null;
  listLivraisonByLivreur:any =[];

  constructor(private _serviceAdmin:AdminService,private modalService: NgbModal,private router:Router,private _rclService:ReclamationService) {}

  
  indexObj(tab,obj,key){
    for (let index = 0; index < tab.length; index++) {
      if(tab[index][key]==obj[key]){
        return index
      }
    }
  }


  cheickedItem(event,l){
    let  index = null;
    console.log(l,event.target.className);
    if(event.target.className=='unchecked'){
      event.target.className='checked';
      this.chechedsItems.push(l);
    }else{
      event.target.className='unchecked';
      index =  this.indexObj(this.chechedsItems,l,'id');
      (this.chechedsItems).splice(index,1);
    }
  }

  cheickedAllItem(event){
    let itemRowCheckboxReclamation = document.querySelectorAll("#itemRowCheckboxReclamation");
    if(event.target.checked== true){
      itemRowCheckboxReclamation.forEach((element)=> {
        console.log(element);
        element.className='checked';
        this.chechedsItems = this.datas;
      });
        
    }else if (event.target.checked== false){
      itemRowCheckboxReclamation.forEach((element)=> {
        console.log(element);
        element.className='unchecked';
        this.chechedsItems = [];
      })
    }
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
    this._rclService.getAllReclamations().subscribe((data: any) => {
      console.log(data)
    });
  }
}
