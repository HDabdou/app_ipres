import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as sha1 from 'js-sha1';
import { ToastrService } from 'ngx-toastr';
import { AdminMakerService } from 'src/app/services/admin-maker.service';

@Component({
  selector: 'app-client-operateur',
  templateUrl: './client-operateur.component.html',
  styleUrls: ['./client-operateur.component.scss']
})
export class ClientOperateurComponent implements OnInit {

  
  etapCreation = 1;
  listUser = [];
  prenom
  nom
  tel;
  login
  password
  typeUtilasateur
  errorMessage = 0;
  closeResult: string;
  selected
  updatePassword
  codePensionnaire
  loading:boolean = false
  constructor(private toastr: ToastrService,private modalService: NgbModal,private router:Router,private _serviceOperateur:AdminMakerService) {}
 
 
 //Création de client
  inscriptonClient(){
    this.loading = true;
   let  requet = {prenom:this.prenom,nom:this.nom,telephone:this.tel,identifiant:this.login,password:sha1(this.password),infoSup:"",accessLevel:4,etat:0,idCreateur:JSON.parse(sessionStorage.getItem('currentUser')).id }
    //this.listUser.push()
    this._serviceOperateur.createUser(requet).then(res =>{
      console.log(res)
      if(res.status = 1){
        this._serviceOperateur.getUserByOperateur({idCreateur:JSON.parse(sessionStorage.getItem('currentUser')).id}).then(res=>{
          console.log(res)
          this.listUser = res['data'];
          this.loading = false;
        })
        this.startloader("Client créer")
      }else{
        this.loading = false;
        this.errorMessageD("Erreur création echec")
      }
    })
    //alert("Client créer")
    this.etapCreation = 1;
    //this.errorMessage = 2;
   /* this._adminService.createUser({prenom:this.prenom,nom:this.nom,telephone:this.tel,identifiant:this.login,password:sha1(this.password),access_level:3}).then(res =>{
      console.log(res)
    })*/
  }
  //Recherche pensionnaire pour la creation;
  recherchePensionnaire(){
    //this.errorMessage = 1
    
      this._serviceOperateur.getPensionnaireByCode({code:this.codePensionnaire}).then(res=>{
        console.log(res)
        if(res.status == 1){
          this.tel = res.pensionnaire.telephone;
          this.prenom = res.pensionnaire.prenom;
          this.nom = res.pensionnaire.nom;
          this.login = this.codePensionnaire;
          this.errorMessage = 1
        }else{
          this.errorMessage = 2
        }
      })
    
  }
  reinitialisation(){
    this.prenom = undefined;
    this.nom = undefined;
    this.tel = undefined;
    this.login = undefined;
    this.password = undefined;
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
    //Update user
    update(){
      this.loading = true;
        this._serviceOperateur.updateUser({prenom:this.selected.prenom,nom:this.selected.nom,telephone:this.selected.telephone,identifiant:this.selected.identifiant,password:""}).then(res=>{
          if(res.status == 1){
            this.loading = false;
            this.startloader('Client mise à jour')
          }else{
            this.loading = false;
            this.errorMessageD("Erreur mise à jour echec")
          }
  
        })
      
    }
  

  ngOnInit(): void {
    this.loading = true;
    console.log(JSON.parse(sessionStorage.getItem('currentUser')).id)
    this._serviceOperateur.getUserByOperateur({idCreateur:JSON.parse(sessionStorage.getItem('currentUser')).id}).then(res=>{
      console.log(res)
      this.listUser = res['data'];
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
