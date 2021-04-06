import { Component, OnInit } from "@angular/core";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  descritionModifier = '';
  success = null;

  loader = null; // état du chargement des données

  datas : ReclamationItem[]= [ ] // listes des réclamations (affichée aprés filtre)

  chechedsItems = []; // Liste des réclamation choisies

  motcle = null; // mot clé cherchercher dans les liste des réclamations pour le filtre du taleau 
  dataBase:ReclamationItem[] = this.datas; // liste des réclamations (sauvegarde de la liste sans filtre)


  /* recherche des réclamations contenant le mot clé recherché;
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
    console.log('salut boy na  whhd')
  }


  closeResult: string; // état du modal
  selected:any = null; // la réclamation sélétionné
  collection = []
  // constructeur de la classe
  // initialise les service et les attributs de la classe
  constructor(private modalService: NgbModal,private router:Router,private _rclService:ReclamationService) {
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
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
        (this.datas).forEach((element)=> {
            if(element.etat ! =1){
              (this.chechedsItems).push(element);
            }
        });
      });
        
    }else if (event.target.checked== false){
      itemRowCheckboxReclamation.forEach((element)=> {
        console.log(element);
        element.className='unchecked';
        this.chechedsItems = [];
      })
    }
  }

  // fermeture du modal
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

// Ouvrir le modal
// En parametre l'identifiant du modal ciblé
open(content) {
  this.modalService.open(content, {windowClass: 'modal-search'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}



// Formater les données reçus du backend
// retourne une liste de réclamation
parseDatas (dataRest):ReclamationItem[]{
  let arr:ReclamationItem[]=[];
  dataRest.forEach(element => {
    arr.push({
      nom:element.operation.nom,
      prenom:element.operation.prenom,
      descrition:element.reclamation.description,
      date: new Date((element.reclamation.updated_at)).toLocaleDateString(),
      etat:element.reclamation.etat,
      idReclamation: element.reclamation.id,
    });
  });
  return arr;
}


// Valider une réclamation traiter
// En parametre la réclamation a valider

validerLaReclammation (obj:ReclamationItem){
  let params = [];
  (this.chechedsItems).forEach(element => {
    params.push({idAdmin:6,idReclamation:element.idReclamation,etat:1})
  });
  this._rclService.setTraiterReclamation({reclamation:params}).then(rep => {
    if(rep.statut==1){
      this.loader = null;
      this.success = true;
      this.getReclamation();
    }
  });
}

// modifier la réclamation
modifierLaReclammation (obj:ReclamationItem){
  console.log({idReclamation:obj.idReclamation,description:obj.descrition});
  this._rclService.setTraiterReclamation({idUser:6,id:obj.idReclamation,description:this.descritionModifier}).then(rep => {
    if(rep.status==1){
      this.loader = null;
      this.success = true;
      this.getReclamation();
    }
  });
  this.loader = true;
}


// Valider la liste des  réclamations séléctionnées
validerLesReclamationSelectionnes (){
  let params = [];
  (this.chechedsItems).forEach(element => {
    params.push({idAdmin:6,idReclamation:element.idReclamation,etat:1})
  });
  this._rclService.setTraiterReclamation({reclamation:params}).then(rep => {
    if(rep.statut==1){
      this.loader = null;
      this.success = true;
      this.getReclamation();
    }
  });
  this.loader = true;
}

  // reccuperer l'ensemble des réclamations
  getReclamation(){
    this._rclService.getAllReclamations({}).then((data: any) => {
      console.log(data.data)
      this.datas = this.dataBase = this.parseDatas(data.data);
    });
  }


  ngOnInit() {
    this.getReclamation();
  }
}
