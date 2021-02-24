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
  selected=null;
  success = null;
  quantite = null;
  motcle = null;

  loader = null; // état du chargement des données

  constructor(private modalService: NgbModal,private _markeplaceService:MarkeplaceService) { }
  datas = [
    {
      nom:'Astech Téléviseur Astech Smart TV',
      description: 'Astech Téléviseur Astech Smart TV',
      prix: 169900,
      text : 'Acheter',
      images: ['https://sn.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/52/69835/1.jpg?4513']
    },
    {
      nom:'Nasco Four à Micro-Ondes 20 Litres',
      description: 'Nasco Four à Micro-Ondes 20 Litres',
      prix: 24577,
      text : 'Acheter',
      images: ['https://sn.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/85/53895/1.jpg?9748']
    }
    ,
    {
      nom:'Generic Smart Watch D116 Montre Connectée',
      description: 'Generic Smart Watch D116 Montre Connectée',
      prix: 24577,
      text : 'Acheter',
      images: ['https://sn.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/34/41605/1.jpg?8068']
    }
  ]
  dataBase = this.datas;


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
  

  open(content,l) {
    this.selected = l;
    console.log(this.selected);
    this.modalService.open(content, {windowClass: 'modal-search'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    return false;

  }

  validerAchat(){
    this.loader = true;
    this._markeplaceService.acheterProduit({code:'1134',quantite:this.quantite,produit:this.selected.nom,prix:this.selected.prix}).then(res=>{
      console.log(res);
      this.loader = null;
      this.success = true;
    })
    return false;
  }

  /*
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

  ngOnInit() {
  //   this._markeplaceService.getProduits({}).then(res=>{
  //     console.log(res);
  //     this.datas =  this.datas = this.parseDatas(res);

  //   })
   }

}
