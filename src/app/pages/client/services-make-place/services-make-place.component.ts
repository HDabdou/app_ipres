import { Component, OnInit } from "@angular/core";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MarkeplaceService } from 'src/app/services/client/markeplace.service';

import { ServiceItem } from '../interfaces/interface.service';
@Component({
  selector: 'app-services-make-place',
  templateUrl: './services-make-place.component.html',
  styleUrls: ['./services-make-place.component.scss']
})
export class ServicesMakePlaceComponent implements OnInit {
  closeResult:string;
  serviceTitre:string;
  serveForm:string;

  constructor(private modalService: NgbModal,private _markeplaceService:MarkeplaceService) { }
  datas : ServiceItem[]= [
    
  ]


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  parseDatas (dataRest){
    let arr=[];
    (dataRest.produit).forEach(element => {
      arr.push({
        img:"https://www.w3schools.com/images/w3schools_green.jpg",
        nom:element.nom,
        prix:element.prix,
        quantite:element.quantite,
        updated_at:element.updated_at,
        text:"Acheter",

      });
  
    });
    
    return arr;
  }
  

  open(content,nom) {
    return false;
    // this.modalService.open(content, {windowClass: 'modal-search'}).result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
    //   this.serviceTitre = nom;
    //   this.serveForm = nom;
    // return false;
  }

  ngOnInit() {
    this._markeplaceService.getProduits({}).then(res=>{
      console.log(res);
      this.datas =  this.datas = this.parseDatas(res);

    })
  }

}
