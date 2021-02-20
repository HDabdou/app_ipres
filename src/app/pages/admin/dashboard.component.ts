import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import { AdminService } from 'src/app/services/admin.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as sha1 from 'js-sha1';
import { Router } from '@angular/router';
import { AdminMakerService } from "src/app/services/admin-maker.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  styleUrls: ['./dashboard.component.scss']

})
export class DashboardComponent implements OnInit {
  public canvas : any;
  public ctx;
  public datasets: any;
  public data: any;
  public myChartData;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;
  patients:any = [];
  nbrUsers:number = 0;
  closeResult: string;
  selected:any;
  symptomes:any=[];
  nbrSymptomes:number = 0;
  listLivreur=[];
  idLivreuer:any = ""
  etap=1;
  prenom
  nom
  tel;
  adresse;
  login
  password
  typeUtilasateur
  nom_entreprise
  listeLivraison:any =[]

  etapCreation = 1;

  paiements = [
    {date:'2021-01-05 10:30:31',prenom:"Fallou",nom:"Fall",adresse:'Pikine',telephone:"771154030",montant:"150000",annee:"2021",mois:"Janvier",etat:1},
    {date:'2021-01-06 11:30:31',prenom:"Fatou",nom:"Dieng",adresse:'Parcelle',telephone:"762214030",montant:"100000",annee:"2021",mois:"Janvier",etat:1},
    {date:'2021-01-07 12:30:31',prenom:"Abdou",nom:"Diouf",adresse:'Yoff',telephone:"771154030",montant:"90000",annee:"2021",mois:"Janvier",etat:0},
    {date:'2021-01-11 13:30:31',prenom:"Ibrahima",nom:"Dieye",adresse:'Thies',telephone:"773474030",montant:"130000",annee:"2021",mois:"Janvier",etat:1},
  ]
  listUser = [];
  listeTodisplay = []
  constructor(private _adminService:AdminMakerService,private modalService: NgbModal,private router:Router) {}
  motcle
  searchAll = () => {
    let value = this.motcle;
    console.log("PASS", { value });
  let temp = this.paiements
    const filterTable = this.paiements.filter(o =>
      Object.keys(o).some(k =>
        String(o[k])
          .toLowerCase()
          .includes(value.toLowerCase())
      )
    );
    this.listeTodisplay = filterTable;
  }

  inscriptonVerificateur(){
    this.listUser.push({prenom:this.prenom,nom:this.nom,telephone:this.tel,identifiant:this.login,password:sha1(this.password),access_level:2})
    this.errorMessage = 2;
    /*this._adminService.createUser({prenom:this.prenom,nom:this.nom,telephone:this.tel,identifiant:this.login,password:sha1(this.password),access_level:2}).then(res =>{
      console.log(res)
    })*/
  }
  inscriptonOperateur(){
    this.listUser.push({prenom:this.prenom,nom:this.nom,telephone:this.tel,identifiant:this.login,password:sha1(this.password),access_level:3})
    this.errorMessage = 2;
   this._adminService.createUser({prenom:this.prenom,nom:this.nom,telephone:this.tel,identifiant:this.login,password:sha1(this.password),accessLevel:3,infoSup:"",etat:1,idCreateur:2}).then(res =>{
      console.log(res)
    })
  }
  inscriptonClient(){
    this.listUser.push({prenom:this.prenom,nom:this.nom,telephone:this.tel,identifiant:this.login,password:sha1(this.password),access_level:3})
    this.errorMessage = 2;
    this._adminService.createUser({prenom:this.prenom,nom:this.nom,telephone:this.tel,identifiant:this.login,password:sha1(this.password),access_level:3}).then(res =>{
      console.log(res)
    })
  }

  reinitialisation(){
    this.prenom = undefined;
    this.nom = undefined;
    this.tel = undefined;
    this.adresse = undefined;
    this.login = undefined;
    this.password = undefined;
    this.nom_entreprise = undefined;
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
 
 
  
 
  displayDate(date){ 
    if(date != ""){
      return new Date(date).toLocaleString();
    }
    
  }
  ConvertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
      var str = '';
    var row = "";

    for (var index in objArray[0]) {
      //console.log(index.toLowerCase);

        //Now convert each value to string and comma-separated
        row += index.toUpperCase() + ',';
    }
    row = row.slice(0, -1);
    //append Label row with line break
    str += row + '\r\n';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }
        str += line + '\r\n';
        
    }
    return str;
}
errorMessage:number = 0
nbrNouveau:number = 0;
nbrAssigne:number = 0;
nbrLivre:number = 0;
nbrCenlevement:number = 0;
nbrCLivraison:number = 0;
nbrretour:number = 0;
nbrAnnuler:number = 0;


  ngOnInit() {
    if(localStorage.getItem("currentuser") == null){
      //this.router.navigate(['/']);
    }
    this.listeTodisplay = this.paiements


  }
  public updateOptions() {
    this.myChartData.data.datasets[0].data = this.data;
    this.myChartData.update();
  }
  ids = [];
  datasSaves

displayData(idLivreur,nom){
  for(let i of this.listUser){
    if(i.iduser == idLivreur){

      if(nom == "prenom"){
        return i.prenom;
      }
      if(nom == "nom"){
        return i.nom
      }
      if(nom == "telephone"){
        return i.telephone;
      }
      if(nom == "accesslevel"){
        return i.accesslevel;
      }
      if(nom == "nom_entreprise"){
        return i.nom_entreprise;
      }
    }
  }
  return "";
}


}
