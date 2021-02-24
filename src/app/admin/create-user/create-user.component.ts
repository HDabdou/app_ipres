import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as sha1 from 'js-sha1';
import { ToastrService } from 'ngx-toastr';
import { AdminMakerService } from 'src/app/services/admin-maker.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

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
  updatePassword = ""
  selected
  constructor(private toastr: ToastrService,private _adminService:AdminMakerService,private modalService: NgbModal,private router:Router) {}
  //pour la suppression d'un utilisateur
  delete(){
    if(this.selected != undefined){
      this.listUser.splice(this.selected,1)
      this._adminService.deleteUser({identifiant:this.selected.identifiant,idDeleter:2}).then(res=>{
        console.log(res)
        this.startloader('Utilisateur supprimé')

      })
    }
  }
  //Pour l'activation des clients crées par les opérateur
  validete(){
    
    if(this.selected != undefined){
      this._adminService.activerClient({identifiant:this.selected.identifiant}).then(res=>{
        console.log(res)
        this.startloader('Utilisateur validé')
      })
      this.selected.etat = 1;
      this.getAllUser()
    }
  }
  //Update user
  update(){
    if(this.updatePassword == ""){
      this._adminService.updateUser({prenom:this.selected.prenom,nom:this.selected.nom,telephone:this.selected.telephone,identifiant:this.selected.identifiant,password:""}).then(res=>{
        console.log(res)
        this.startloader('Utilisateur mise à jour')

      })
      this.getAllUser()
    }else{
      if(confirm("Voullez aller modifier le mot de passe de l'utilisateur")){
        this._adminService.updateUser({prenom:this.selected.prenom,nom:this.selected.nom,telephone:this.selected.telephone,identifiant:this.selected.identifiant,password:sha1(this.updatePassword)}).then(res=>{
          console.log(res)
          this.startloader('Utilisateur mise à jour')

        })
        this.getAllUser()
      }
    }
  }
  //Inscription Vérifcateur
  inscriptonVerificateur(){
    this.listUser.push({prenom:this.prenom,nom:this.nom,telephone:this.tel,identifiant:this.login,password:sha1(this.password),access_level:2,etat:1})
    this.errorMessage = 2;
    this._adminService.createUser({prenom:this.prenom,nom:this.nom,telephone:this.tel,identifiant:this.login,password:sha1(this.password),accessLevel:2,infoSup:"",etat:1,idCreateur:2}).then(res =>{
      console.log(res)
    })
    this.getAllUser()
    this.etapCreation = 1
    this.startloader('Vérificateur créer')

  }
  //inscription OPERATEUR
  inscriptonOperateur(){
    this.listUser.push({prenom:this.prenom,nom:this.nom,telephone:this.tel,identifiant:this.login,password:sha1(this.password),access_level:3,etat:1})
    this.errorMessage = 2;
    this._adminService.createUser({prenom:this.prenom,nom:this.nom,telephone:this.tel,identifiant:this.login,password:sha1(this.password),accessLevel:3,infoSup:"",etat:1,idCreateur:2}).then(res =>{
      console.log(res)
      this.listUser = res['data']
      this.startloader("")
    })
    
   this.getAllUser()
    this.etapCreation = 1
    this.startloader('Opérateur créer')
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
  //Pour abtenir la liste des utilisateur
  getAllUser(){
    this._adminService.getAllUsers().then(res=>{
      console.log(res)
      this.listUser = res['data']
    })
  }
  ngOnInit(): void {
    
  
    this._adminService.getAllUsers().then(res=>{
      console.log(res)
      this.listUser = res['data']
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
