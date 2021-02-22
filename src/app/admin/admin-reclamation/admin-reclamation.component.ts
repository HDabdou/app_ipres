import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminMakerService } from 'src/app/services/admin-maker.service';

@Component({
  selector: 'app-admin-reclamation',
  templateUrl: './admin-reclamation.component.html',
  styleUrls: ['./admin-reclamation.component.scss']
})
export class AdminReclamationComponent implements OnInit {

  closeResult
  selected;
  listeReclamation = []
 
  constructor(private toastr: ToastrService ,private modalService: NgbModal,private _adminService:AdminMakerService) { }
  //validation du traitement
  validerTraitement(){
    
    this._adminService.traiterReclamation({idReclamation:this.selected.reclamation.id,etat:1,idAdmin:2}).then(res=>{
      console.log(res)
      this.selected.reclamation.etat = 1
      this.startloader("Réclamation validé")
    })
  }
  //ferme le modal
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  //Ouvre le modal
open(content) {
  this.modalService.open(content, {windowClass: 'modal-search'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
  ngOnInit(): void {
    //Recupération de la liste des Réclamation 
    this._adminService.getReclamation().then(res=>{
      console.log(res)
      this.listeReclamation = res['data']
    })
  }
  startloader(message){   
    this.toastr.info('<span class="tim-icons icon-check-2" [data-notify]="icon"></span>  <b>IPRES</b> - '+message, '', {
       disableTimeOut: true,
       closeButton: true,
       enableHtml: true,
       toastClass: "alert alert-success alert-with-icon",
       positionClass: 'toast-top-center'
     });    
}

}
