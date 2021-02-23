import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminMakerService } from 'src/app/services/admin-maker.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
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
    this.annee = new Date(this.date).toJSON().split('T')[0][0];
    this.mois = new Date(this.date).toJSON().split('T')[0][1];
    console.log({code:this.code,prenom:this.prenom,nom:this.nom,telephone:this.tel,montant:this.montant,annee:this.annee,mois:this.mois})
    this.listeExcel.push({code:this.code,prenom:this.prenom,nom:this.nom,telephone:this.tel,montant:this.montant,annee:this.annee,mois:parseInt(this.mois)+1});
    this.startloader("ligne ajouter avec succés")

  }
  //Enregistrement du tableau importé via Excel dans la base
  saveUpload(){
    this._adminService.saveUpload({ops:this.listeExcel}).then(res=>{
      console.log(res.status)
      if(res.statut == 1){
        this.startloader("liste enregistrer avec succées")
      }
      
    })
    this.listeExcel = []
  }

  moisEnLettre = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  //Pour l'affichage des mois en lettre
  displayMonth(arg){
    let i = parseInt(arg) -1
    return this.moisEnLettre[0]
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
  ngOnInit(): void {
  }

}
