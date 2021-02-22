import { Component, OnInit } from "@angular/core";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import * as sha1 from 'js-sha1';
import { Router } from '@angular/router';
import {ReclamationItem} from '../interfaces/interface.operationItem';
import { OperationService } from 'src/app/services/verificateur/operation.service';
import { OperationsClientItem } from '../../client/interfaces/interface.OperationsClientItem';
import { abort } from 'process';

@Component({
  selector: 'app-validation-ops',
  templateUrl: './validation-ops.component.html',
  styleUrls: ['./validation-ops.component.scss']
})
export class ValidationOpsComponent implements OnInit {
  datas : ReclamationItem[]= [
    

  ]

  loader=null;
  success = null;

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
  }
  
  listLivreur:any = [];
  closeResult: string;
  selected:any = null;
  listLivraisonByLivreur:any =[];
  constructor(private modalService: NgbModal,private router:Router,private _oprService:OperationService) {}

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

    
    
    
    
    parseDatas (dataRest):any{
      let arr:any=[];
      dataRest.forEach(element => {
        arr.push({
          prenom:element.prenom,
          nom:element.nom,
          date:element.updated_at,
          montant:element.montant,
          tel:element.telephone,
          obj:element
        });
      });
      return arr;
    }

    
      ngOnInit() {
        this._oprService.getOperations({}).then((data: any) => {
          console.log(data)
          this.datas = this.dataBase = this.parseDatas(data.op);
        });
      }

    validerLaDemande (obj){
      let listeOPerations = [];
      listeOPerations.push(obj.obj);
      console.log(obj);
      this.loader = true;

      console.log(listeOPerations);
      this._oprService.validerOperations({op:listeOPerations}).then(rep => {
        console.log(rep);       
        if(rep.status==1){
          this.loader = null;
          this.success = true;
        }
      });
      this.loader = true;
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
  


    validerLaDemandeSelectionnes (){
      console.log(this.chechedsItems);
      this.loader = true;
    }

}
