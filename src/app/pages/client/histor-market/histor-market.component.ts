import { Component, OnInit } from "@angular/core";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as sha1 from 'js-sha1';
import { Router } from '@angular/router';
import {ReclamationItem} from '../interfaces/interface.operationItem';
import { HistoriqueService } from 'src/app/services/client/historique.service';



@Component({
  selector: 'app-histor-market',
  templateUrl: './histor-market.component.html',
  styleUrls: ['./histor-market.component.scss']
})
export class HistorMarketComponent implements OnInit {

  datas= []

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
  constructor(private modalService: NgbModal,private router:Router,private _histService:HistoriqueService) {}

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

// Formater les données reçus du backend
// retourne une liste de réclamation
parseDatas (dataRest){
  let arr=[];
  (dataRest.historique).forEach(element => {
    arr.push({
      produit:element.produit,
      quantite:element.quantite,
      prix:element.prix,
      created_at: new Date((element.created_at)).toLocaleDateString(),
      updated_at: new Date((element.updated_at)).toLocaleDateString(),
      id:element.id,
    });
  });
  return arr;
}


  ngOnInit() {
    this._histService.getHistoriques({code:'1134'}).then(res=>{
      console.log(res);
      this.datas = this.dataBase = this.parseDatas(res);

    })
    return false;
  }
}
