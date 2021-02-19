import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as sha1 from 'js-sha1';
import { AdminMakerService } from 'src/app/services/admin-maker.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  etapCreation = 1;
  listUser = [
    {prenom:"Ibrahima",nom:"DIAW",telephone:"779854631",identifiant:"1685466564",password:sha1("13425"),access_level:4,etat:0 },
    {prenom:"Coumba",nom:"NDIAYE",telephone:"779811131",identifiant:"1689966564",password:sha1("13425"),access_level:4,etat:0 },
  ];
  prenom
  nom
  tel;
  login
  password
  typeUtilasateur
  errorMessage = 0;
  closeResult: string;
  selected
  constructor(private _adminService:AdminMakerService,private modalService: NgbModal,private router:Router) {}
  delete(){
    if(this.selected != undefined){
      this.listUser.splice(this.selected,1)
    }
  }
  validete(){
    if(this.selected != undefined){
      this.selected.etat = 1
    }
  }
  update(){
    
  }
  inscriptonVerificateur(){
    this.listUser.push({prenom:this.prenom,nom:this.nom,telephone:this.tel,identifiant:this.login,password:sha1(this.password),access_level:2,etat:1})
    this.errorMessage = 2;
    /*this._adminService.createUser({prenom:this.prenom,nom:this.nom,telephone:this.tel,identifiant:this.login,password:sha1(this.password),access_level:2}).then(res =>{
      console.log(res)
    })*/
  }
  inscriptonOperateur(){
    this.listUser.push({prenom:this.prenom,nom:this.nom,telephone:this.tel,identifiant:this.login,password:sha1(this.password),access_level:3,etat:1})
    this.errorMessage = 2;
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
  }

}
