import { Component, OnInit } from "@angular/core";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as sha1 from 'js-sha1';
import { Router } from '@angular/router';
import {ReclamationItem} from '../interfaces/interface.operationItem';
import { HistoriqueService } from 'src/app/services/client/historique.service';
import { ServiceSentoolService } from 'src/app/services/client/service-sentool.service';

@Component({
  selector: 'app-operations-sentoll',
  templateUrl: './operations-sentoll.component.html',
  styleUrls: ['./operations-sentoll.component.scss']
})
export class OperationsSentollComponent implements OnInit {

  datas : ReclamationItem[]= []

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






  ngOnInit() {

  }

}
