import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  constructor(private _adminService:AdminMakerService,private modalService: NgbModal,private router:Router) {}

  selected
  validerParamMontant(){
    if(this.selected != undefined){
      this.selected.montant = this.paramMontant;
    }
    this.paramMontant = undefined;
  }
  fileName:any;
  listeExcel
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
     console.log(this.listeExcel)
    } 
    fileReader.readAsArrayBuffer(this.file);
    for(let i of this.listeExcel){
      console.log(i.nom);
    }
  }

  reinitialisation(){
    this.prenom = undefined;
    this.nom = undefined;
    this.tel = undefined;
    this.montant = undefined;
    this.date = undefined;
  }
  removeLine(){
    this.listeExcel.splice(this.selected,1)
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
  addLigne(){
    this.annee = new Date(this.date).toJSON().split('T')[0][0];
    this.mois = new Date(this.date).toJSON().split('T')[0][1];
    console.log({prenom:this.prenom,nom:this.nom,telephone:this.tel,montant:this.montant,annee:this.annee,mois:this.mois})
    this.listeExcel.push({prenom:this.prenom,nom:this.nom,telephone:this.tel,montant:this.montant,annee:this.annee,mois:this.mois});

  }

  ngOnInit(): void {
  }

}
