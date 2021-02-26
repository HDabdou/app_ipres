import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import * as sha1 from 'js-sha1';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username;
  password;
  public sidebarColor: string = "primary";
  side = 'blue';
  closeResult
  etapReinitialisation:number = 1;
  telephone;
  smsPassword;
  newPassword;
  confirmPassword;
  idUserForChange:any;
  collection = [];
  constructor(private modalService: NgbModal,private router:Router,private _loginService:LoginService,private toastr: ToastrService) {

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
  /*motDePasseOublie(){
    
    this._adminService.motDePassOublie({telephone:this.telephone}).then(res=>{
      console.log(res);
      if(res['status']){
        this.idUserForChange = res['iduser'];
        this.etapReinitialisation = 3;
        //alert('Vous aller recevoire un mot de passe SMS')
      }else{
        this.etapReinitialisation = 4;
        //alert('Numéro de téléphone incorrect ou non autorisé');
      }

    })
  }
  changerMotDePasse(){
    if(this.newPassword == this.confirmPassword){
      this._adminService.reinitialiserPassword({newpassword:sha1(this.newPassword),oldpassword:sha1(this.smsPassword),iduser:this.idUserForChange}).then(res=>{
        console.log(res);
        if(res['status'] == true){
          alert("mot de passe changé");
          this.etapReinitialisation = 1;
          this.telephone = undefined;
          this.smsPassword = undefined;
          this.newPassword = undefined;
          this.confirmPassword = undefined;
        }else{
          alert("SMS password incorrect");
        }
      })
    }else{
      alert("le nouveau et la confirmation sont différantes")
    }
    
  }*/
open(content) {
  this.modalService.open(content, {windowClass: 'modal-search'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
  changeSidebarColor(color){
    var sidebar = document.getElementsByClassName('sidebar')[0];
    var mainPanel = document.getElementsByClassName('main-panel')[0];

    this.sidebarColor = color;

    if(sidebar != undefined){
        sidebar.setAttribute('data',color);
    }
    if(mainPanel != undefined){
        mainPanel.setAttribute('data',color);
    }
  }
  content:string = 'white-content';
  changeDashboardColor(color){
    var body = document.getElementsByTagName('body')[0];
    if (body && color === 'white-content') {
        body.classList.add(color);
    }
    else if(body.classList.contains('white-content')) {
      body.classList.remove('white-content');
    }
  }
  ngOnInit() {
    this.changeDashboardColor(this.content);
    this.changeSidebarColor(this.side);
    sessionStorage.clear()
  }
  errorMessage:number = 0;
  login1(){
 
    if(this.username == "a" && this.password == "1"){
      sessionStorage.setItem('profile','admin');
      this.router.navigate(['/admin'])
    }else if(this.username == "o" && this.password == "1"){
      sessionStorage.setItem('profile','operateur');
      this.router.navigate(['/clientOperateur'])
    }else if(this.username=="v" && this.password=="v"){
      sessionStorage.setItem('profile','verificateur');
      this.router.navigate(['/verificateur'])
      
    }else if(this.username=="c" && this.password=="c"){
      sessionStorage.setItem('profile','client');
       this.router.navigate(['/operationsSentool']) 
  
    }else{
      this.startloader('Login ou password incorrect !!')
    }
      
   // this.router.navigate(['/admin'])
}
startloader(message){   
  this.toastr.info('<span class="tim-icons icon-simple-remove" [data-notify]="icon"></span>  <b>IPRES</b> - '+message, '', {
     disableTimeOut: true,
     closeButton: true,
     enableHtml: true,
     toastClass: "alert alert-daner alert-with-icon",
     positionClass: 'toast-top-center'
   });    
}


}
