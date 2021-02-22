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

  success = null;

  loader = null;

  datas : ReclamationItem[]= [ ]

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
  collection = []
  constructor(private _serviceAdmin:AdminService,private modalService: NgbModal,private router:Router,private _rclService:ReclamationService) {
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
  }

  

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




parseDatas (dataRest):ReclamationItem[]{
  let arr:ReclamationItem[]=[];
  dataRest.forEach(element => {
    arr.push({
      nom:element.operation.nom,
      prenom:element.operation.prenom,
      descrition:element.reclamation.description,
      date:element.reclamation.updated_at,
      etat:element.reclamation.etat,
      idReclamation: element.reclamation.id,
    });
  });
  return arr;
}



validerLaReclammation (obj:ReclamationItem){
  console.log({idAdmin:6,idReclamation:obj.idReclamation,etat:1});
  this._rclService.setTraiterReclamation({idAdmin:6,idReclamation:obj.idReclamation,etat:1}).then(rep => {
    if(rep.statut==1){
      this.loader = null;
      this.success = true;
    }
  });
  this.loader = true;
}

modifierLaReclammation (obj:ReclamationItem){
  console.log({idReclamation:obj.idReclamation,description:obj.descrition});
  this._rclService.setTraiterReclamation({idReclamation:obj.idReclamation,description:obj.descrition}).then(rep => {
    if(rep.statut==1){
      this.loader = null;
      this.success = true;
    }
  });
  this.loader = true;
}

validerLesReclamationSelectionnes (){
  console.log(this.chechedsItems);
  this.loader = true;
} 



ngOnInit() {
  this._rclService.getAllReclamations({}).then((data: any) => {
    console.log(data.data)
    this.datas = this.dataBase = this.parseDatas(data.data);
  });
}
}
