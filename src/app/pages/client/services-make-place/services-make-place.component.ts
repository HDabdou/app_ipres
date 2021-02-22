import { Component, OnInit } from "@angular/core";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private modalService: NgbModal) { }
  datas : ServiceItem[]= [
    {
      nom: 'Service 1',
      description:'description du service',
      text:"Faire l'Opération"
    },
    {
      nom: 'Service 2',
      description:'description du service',
      text:"Faire l'Opération"
    },
    {
      nom: 'Service 3',
      description:'description du service',
      text:"Faire l'Opération"
    },
    {
      nom: 'Service 4',
      description:'description du service',
      text:"Faire l'Opération"
    },
    
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

  }

}
