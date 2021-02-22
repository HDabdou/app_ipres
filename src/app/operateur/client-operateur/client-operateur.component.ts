import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as sha1 from 'js-sha1';
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
  constructor(private modalService: NgbModal,private router:Router,private _serviceOperateur:AdminMakerService) {}
 
  update(){
    this.selected.etat = 0;
  }
 
  inscriptonClient(){
   let  requet = {prenom:this.prenom,nom:this.nom,telephone:this.tel,identifiant:this.login,password:sha1(this.password),infoSup:"",accessLevel:4,etat:0,idCreateur:4 }
    //this.listUser.push()
    this._serviceOperateur.createUser(requet).then(res =>{
      console.log(res)
    })
    //alert("Client créer")
    this.etapCreation = 1;
    //this.errorMessage = 2;
   /* this._adminService.createUser({prenom:this.prenom,nom:this.nom,telephone:this.tel,identifiant:this.login,password:sha1(this.password),access_level:3}).then(res =>{
      console.log(res)
    })*/
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


  ngOnInit(): void {
    this._serviceOperateur.getUserByOperateur({idCreateur:4}).then(res=>{
      console.log(res)
      this.listUser = res['data'];
    })
  }


}
