import { Component, OnInit } from "@angular/core";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as sha1 from 'js-sha1';
import { Router } from '@angular/router';
import {ReclamationItem} from '../interfaces/interface.operationItem';
@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent implements OnInit {
  datas : ReclamationItem[]= [] // listes des opérations (affichée aprés filtre)

  motcle = null; // mot clé cherchercher dans les liste des opérations pour le filtre du taleau 
  dataBase:ReclamationItem[] = this.datas; // liste des opérations (sauvegarde de la liste sans filtre)


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
  
  closeResult: string; // Résultat fermeture du modal
  selected:any = null; // Opérations Séléctionnée

  constructor(private modalService: NgbModal,private router:Router) {}

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

// Ouvrir Modal
//En parametre l'identifient du modal
open(content) {
  this.modalService.open(content, {windowClass: 'modal-search'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

  ngOnInit() {

  }
}
