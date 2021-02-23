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

  loader=null; // état du chargement des données
  success = null; //état de la requete de validation
  chechedsItems = []; // tableau  des opérations sélectionnées 

  motcle = null; // mot clé rechercher 
  dataBase:ReclamationItem[] = this.datas;

  /* recherche des opérations contenant le mot clé recherché;
   * renvoie la liste conténant le mot clé
   * ne prend aucun parametre
   */
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
  
  closeResult: string;
  selected:any = null;

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

    /*
    * Valider une demande
    * prend en parametres la demande
    */
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

  /*
  * Rechercher l'indice d'un objet dans un tableau d'objets
  * prend en parametre le tableau (tab),l'objet (obj) et la clé réchercher (key)
  * retourne l'indice
  */
  indexObj(tab,obj,key){
    for (let index = 0; index < tab.length; index++) {
      if(tab[index][key]==obj[key]){
        return index
      }
    }
  }

  /*
  * séléctionner une ligne dans le tableau HTML (liste des demandes)
  *  retourne la liste selectionnée
  */

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

    /*
    * séléctionner toutes  les lignes dans le tableau HTML (liste des demandes)
    *  retourne la liste selectionnée
    */
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
  


    /*
    * Validé la liste  des  demandes
    */
    validerLaDemandeSelectionnes (){
      console.log(this.chechedsItems);
      this.loader = true;
    }

}
