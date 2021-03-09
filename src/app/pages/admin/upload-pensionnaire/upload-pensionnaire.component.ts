import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminMakerService } from 'src/app/services/admin-maker.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-upload-pensionnaire',
  templateUrl: './upload-pensionnaire.component.html',
  styleUrls: ['./upload-pensionnaire.component.scss']
})
export class UploadPensionnaireComponent implements OnInit {
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
  code
  constructor(private toastr: ToastrService,private _adminService:AdminMakerService,private modalService: NgbModal,private router:Router) {}

  selected
  //Paramètrage des montant pour changé le montant 
  validerParamMontant(){
    if(this.selected != undefined){
      this.selected.montant = this.paramMontant;
      this.startloader("Montant paramètrer avec succés")

    }
    this.paramMontant = undefined;
  }

  //importaion (upload ) du ficher de paiement excel
  fileName:any;
  listeExcel = []
  file
  data
  listeRecrutement
  fileChange(event) {
    this.file= event.target.files[0];
    console.log(this.file);
    
    this.fileName = this.file.name
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      //console.log(fileReader.result);
      this.data = fileReader.result;
      let datas = new Uint8Array(this.data);
      var arr = new Array();
      for(var i = 0; i != datas.length; ++i) arr[i] = String.fromCharCode(datas[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, {type:"binary"});
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      //console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
      this.listeExcel= XLSX.utils.sheet_to_json(worksheet,{raw:true})
     // for(let i = 0; i < this.listeExcel.length ;++i){
       // this.listeRecrutement.push(this.listeExcel[i])
      //}
      this.startloader("Tableau importer avec succés");

    } 
    fileReader.readAsArrayBuffer(this.file);
   
  }
//reinitialisation
  reinitialisation(){
    this.prenom = undefined;
    this.nom = undefined;
    this.tel = undefined;
    this.montant = undefined;
    this.date = undefined;
  }
  //Pour supprimer un ligne
  removeLine(){
    this.listeExcel.splice(this.selected,1)
    this.startloader("ligne supprimer avec succées")

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
  //Ajout d'un nouvelle ligne 
  addLigne(){
    this.listeExcel = []
  
    //console.log({code:this.code,prenom:this.prenom,nom:this.nom,telephone:this.tel,montant:this.montant,annee:this.annee,mois:this.mois})
    this.listeExcel.push({code:this.code,prenom:this.prenom,nom:this.nom,telephone:this.tel,montant:this.montant});
    this.startloader("ligne ajouter avec succés")
    console.log(this.listeExcel)
  }
  //Enregistrement du tableau importé via Excel dans la base
  saveUpload(){
    this._adminService.addPensionnaire({pens:this.listeExcel}).then(res=>{
      console.log(res.statut)
      if(res.status == 1){
        if(res.alreadyexist.length == 0){
          this.listeExcel = [];
        }else{
          this.errortloader('La liste restante existent déjà dans la base de données')
          this.listeExcel = res.alreadyexist;
        }
        this.startloader("liste enregistrer avec succées")
      }
      
    })
    //this.listeExcel = []
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

    errortloader(message){   
      this.toastr.info('<span class="tim-icons icon-check-2" [data-notify]="icon"></span>  <b>IPRES</b> - '+message, '', {
        disableTimeOut: true,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: 'toast-top-center'
      });    
    }
  ngOnInit(): void {
  }

}
