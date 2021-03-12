import { TmplAstRecursiveVisitor } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminMakerService } from 'src/app/services/admin-maker.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-reclamation-operateur',
  templateUrl: './reclamation-operateur.component.html',
  styleUrls: ['./reclamation-operateur.component.scss']
})
export class ReclamationOperateurComponent implements OnInit {
  etapCreation = 1;
  listUser = [];
  prenom
  nom
  tel;
  montant
  date
  typeUtilasateur
  errorMessage = 0;
  closeResult: string;
  paramMontant
  description
  idclient
  listeReclamation = [];
  listeOperation = []
  loading:boolean = false;
  constructor(private toastr: ToastrService,private modalService: NgbModal,private router:Router,private _serviceOperateur:AdminMakerService) {}

  etapUpdate = 1;
  selected

  listeClient = []
  //Permet de valider la réclamation
  validerAddReclamation(){
    this.loading = true;
    this._serviceOperateur.initReclamation({idInitiateur:JSON.parse(sessionStorage.getItem('currebtUser')).id,code:this.idclient,description:this.description,idOperation:this.idoperation }).then(res=>{
      console.log(res)
      if(res['statut'] = 1){
        this._serviceOperateur.getReclamationByOperateur({idInitiateur:JSON.parse(sessionStorage.getItem('currebtUser')).id}).then(res=>{
          this.listeReclamation= res['data'];
          this.loading = false;
        })
        this.startloader('Réclamation ajouté')
        
      }else{
        this.loading = false;
        this.errorMessageD("Error : Réclamation non ajouté")
      }
    })
 }

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
  annee
  mois:any;
  idoperation;
  //Pour obtenir la liste de ces clients
  getCLientByOperateur(){
    this.loading = true;
    this._serviceOperateur.getUserByOperateur({idCreateur:JSON.parse(sessionStorage.getItem('currebtUser')).id}).then(res=>{
      console.log(res)
      this.listeClient = res['data'];
      this.loading = false;
    })
  }
  //Pour obtenir la liste des opérations du client
  getOperationByClient(){
    this.loading = true;
    console.log(this.idclient)
    this._serviceOperateur.getOperationByClient({code:this.idclient}).then(res =>{
      console.log(res)
      if(res.status == 1 ){
        this.listeOperation = res['data'];
        if(this.listeOperation.length == 0){
          this.etapUpdate = -1;
          this.loading = false;
        }else{
          this.loading = false;
          this.etapUpdate = 2;
        }
        
      }else{
        this.loading = false;
      }
     
    })
  }
  //statut
  moisEnLettre = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  //Pour l'affichage des mois en lettre
  displayMonth(arg){
    let i = parseInt(arg) -1
    return this.moisEnLettre[0]
  }
  idR
  //Pour mettre à jour une réclamation
  updateReclamation1(){
    this.loading = true;
    this._serviceOperateur.updateReclamationOp({id:this.idR,description:this.description,idUser:JSON.parse(sessionStorage.getItem('currebtUser')).id}).then(res=>{
      console.log(res)
      if(res['statut'] = 1){
        this._serviceOperateur.getReclamationByOperateur({idInitiateur:JSON.parse(sessionStorage.getItem('currebtUser')).id}).then(res=>{
          this.listeReclamation= res['data'];
          this.loading = false;
        })
        this.description = undefined;
        this.startloader('Réclamation mise à jour')
      }else{
        this.loading = false;
        this.errorMessageD("Error : mise à jour echec")
      }
    })
  }
  ngOnInit(): void {
    this.loading = true;
    console.log(JSON.parse(sessionStorage.getItem('currebtUser')).id)
    //Pour la liste des réclamations de l'opérateur
    this._serviceOperateur.getReclamationByOperateur({idInitiateur:JSON.parse(sessionStorage.getItem('currebtUser')).id}).then(res=>{
      this.listeReclamation= res['data'];
      this.loading = false;
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
errorMessageD(message){   
  this.toastr.info('<span class="tim-icons icon-simple-remove" [data-notify]="icon"></span>  <b>IPRES</b> - '+message, '', {
     disableTimeOut: true,
     closeButton: true,
     enableHtml: true,
     toastClass: "alert alert-danger alert-with-icon",
     positionClass: 'toast-top-center'
   });    
}

}
