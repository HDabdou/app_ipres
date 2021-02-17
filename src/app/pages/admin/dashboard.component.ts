import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import { AdminService } from 'src/app/services/admin.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as sha1 from 'js-sha1';
import { Router } from '@angular/router';

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
  listUser:any = []
  constructor(private _adminService:AdminService,private modalService: NgbModal,private router:Router) {}
  retourEtAnnuler(){
    let dd = ((new Date()).toJSON()).split("T",2)[0];

    console.log(this.selected)
    this.nbrNouveau = 0;
    this.nbrAssigne = 0;
    this.nbrLivre = 0;
    this.nbrCLivraison = 0;
    this.nbrCenlevement = 0;
    this.nbrretour = 0;
    this.nbrAnnuler = 0;
    if(confirm("Voulez vous annulé cette demande")){
      this._adminService.retourEtAnnuler({idLivraison:this.selected.idlivraison}).then(res =>{
        console.log(res);
        if(res['status'] == true){
          alert("livaison annulé")
          this._adminService.getLivraisonAdmin({dateDebut:dd,dateFin:dd}).then(res=>{
            this.patients = [];
            this.listLivreur = [];
            console.log(res);
            if(res["status"] == true){
              this.patients = res['message'];
              this.listeLivraison =  res['message'];
              //this.nbrUsers = this.patients.length
              for(let i of this.patients){
                if(i.Etat == 0){
                  this.nbrNouveau = this.nbrNouveau + 1;
                }
                 if(i.Etat == 1){
                  this.nbrAssigne = this.nbrAssigne + 1;
                }
                 if(i.Etat == 2){
                  this.nbrCenlevement = this.nbrCenlevement + 1;
                }
                if(i.Etat == 3){
                  this.nbrCLivraison = this.nbrCLivraison + 1;
                }
                 if(i.Etat == 4){
                   if(i.last_modifield.includes(dd)){
                    this.nbrLivre = this.nbrAssigne + 1;
                   }
                  
                }
                if(i.Etat == 8){
                 this.nbrretour = this.nbrretour + 1;
               }
               if(i.Etat == 9){
                this.nbrAnnuler = this.nbrAnnuler + 1;
              }
              }
             
            }
           
          })
        }else{
          alert("annulation echoués")
        }
      })
    }
  }
  deleteLivraison(){
    let dd = ((new Date()).toJSON()).split("T",2)[0];

    console.log(this.selected)
    this.nbrNouveau = 0;
    this.nbrAssigne = 0;
    this.nbrLivre = 0;
    this.nbrCLivraison = 0;
    this.nbrCenlevement = 0;
    this.nbrAnnuler = 0;
    this.nbrAnnuler = 0;
    if(confirm("Voulez vous supprimé cette demande")){
      this._adminService.deleteLivraisonByAdmin({idLivraison:this.selected.idlivraison}).then(res =>{
        console.log(res);
        if(res['status'] == true){
          alert("livaison supprimé")
          this._adminService.getLivraisonAdmin({dateDebut:dd,dateFin:dd}).then(res=>{
            this.patients = [];
            this.listLivreur = [];
            console.log(res);
            if(res["status"] == true){
              this.patients = res['message'];
              this.listeLivraison =  res['message'];
              //this.nbrUsers = this.patients.length
              for(let i of this.patients){
                if(i.Etat == 0){
                  this.nbrNouveau = this.nbrNouveau + 1;
                }
                 if(i.Etat == 1){
                  this.nbrAssigne = this.nbrAssigne + 1;
                }
                 if(i.Etat == 2){
                  this.nbrCenlevement = this.nbrCenlevement + 1;
                }
                if(i.Etat == 3){
                  this.nbrCLivraison = this.nbrCLivraison + 1;
                }
                 if(i.Etat == 4){
                   if(i.last_modifield.includes(dd)){
                    this.nbrLivre = this.nbrAssigne + 1;
                   }
                  
                }
                if(i.Etat == 8){
                  this.nbrretour = this.nbrretour + 1;
                }
                if(i.Etat == 9){
                  this.nbrAnnuler = this.nbrAnnuler + 1;
                }
              }
             
            }
           
          })
        }else{
          alert("suppression echoués")
        }
      })
    }
  }
  assignation(livraison,livrereur){
    console.log(livraison+"  "+livrereur);
    let dd = ((new Date()).toJSON()).split("T",2)[0];
    this._adminService.assignation({idLivrereur:livrereur,idLivraison:livraison}).then(res=>{
      console.log(res);
      if(res['status'] == true){
        this.selected.Etat = 1;
        this.idLivreuer = ""
        this.modalService.dismissAll()
        alert("Assignation effectué avec succés")
        this.nbrNouveau = 0;
        this.nbrAssigne = 0;
        this.nbrLivre = 0;
        this.nbrCLivraison = 0;
        this.nbrCenlevement = 0;
        this.nbrretour = 0;

        this.nbrAnnuler = 0
        this._adminService.getLivraisonAdmin({dateDebut:dd,dateFin:dd}).then(res=>{
          this.patients = [];
          this.listLivreur = [];
          console.log(res);
          if(res["status"] == true){
            this.patients = res['message'];
            //this.nbrUsers = this.patients.length
            for(let i of this.patients){
              if(i.Etat == 0){
                this.nbrNouveau = this.nbrNouveau + 1;
              }
               if(i.Etat == 1){
                this.nbrAssigne = this.nbrAssigne + 1;
              }
               if(i.Etat == 2){
                this.nbrCenlevement = this.nbrCenlevement + 1;
              }
              if(i.Etat == 3){
                this.nbrCLivraison = this.nbrCLivraison + 1;
              }
               if(i.Etat == 4){
                 if(i.last_modifield.includes(dd)){
                  this.nbrLivre = this.nbrAssigne + 1;
                 }
                
              }
              if(i.Etat == 8){
                this.nbrretour = this.nbrretour + 1;
              }
              if(i.Etat == 9){
                this.nbrAnnuler = this.nbrAnnuler + 1;
              }
            }
          
          }
        
        })
      }else{
        this.idLivreuer = ""
        alert("Assignation non effectué !!!")
      }
       
    })

  }
  inscripton(){
    this._adminService.checkLogin({login:this.login}).then(re=>{
      if(re['status'] == true){
        this._adminService.inscription({nom:this.nom,prenom:this.prenom,telephone:this.tel,adresse:this.adresse,accesslevel:2,login:this.login,password:sha1(this.password)}).then(res=>{
          console.log(res);
          if(res['status'] == true){
            this.errorMessage = 2;
            this.prenom = undefined;
            this.nom = undefined;
            this.tel = undefined;
            this.adresse = undefined;
            this.login = undefined;
            this.password = undefined;
            this.typeUtilasateur = undefined
          }
        })
      }else{
        alert('login déjà utilsé');
      }
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
  inscriptonCorporate(){
    this._adminService.checkLogin({login:this.login}).then(re=>{
      if(re['status'] == true){
        this._adminService.inscriptionCorporate({nom:this.nom,prenom:this.prenom,telephone:this.tel,adresse:this.adresse,accesslevel:4,login:this.login,password:sha1(this.password),nom_entreprise:this.nom_entreprise}).then(res=>{
          console.log(res);
          if(res['status'] == true){
            this.errorMessage = 2;
            this.prenom = undefined;
            this.nom = undefined;
            this.tel = undefined;
            this.adresse = undefined;
            this.login = undefined;
            this.password = undefined;
            this.nom_entreprise = undefined;
            this.typeUtilasateur = undefined
          }
        })
      }else{
        alert('login déjà utilsé');
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
  open1(content1) {
    this.modalService.open(content1, {windowClass: 'modal-search'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  symptomeByUser = [];
  quatorzaine = [
    {"jj":"J1","date":"","temperature":"","toux":"","difficulteRespirer":"","malGorge":"","nezBouche":"","conjonctivite":"","mauxtete":"","douleurMusculaire":"","fatigueintense":"","vomissement":"","diarrhee":"","perteOdorat":"","perteGout":"","autreSigne":"",},
    {"jj":"J2","date":"","temperature":"","toux":"","difficulteRespirer":"","malGorge":"","nezBouche":"","conjonctivite":"","mauxtete":"","douleurMusculaire":"","fatigueintense":"","vomissement":"","diarrhee":"","perteOdorat":"","perteGout":"","autreSigne":"",},
    {"jj":"J3","date":"","temperature":"","toux":"","difficulteRespirer":"","malGorge":"","nezBouche":"","conjonctivite":"","mauxtete":"","douleurMusculaire":"","fatigueintense":"","vomissement":"","diarrhee":"","perteOdorat":"","perteGout":"","autreSigne":"",},
    {"jj":"J4","date":"","temperature":"","toux":"","difficulteRespirer":"","malGorge":"","nezBouche":"","conjonctivite":"","mauxtete":"","douleurMusculaire":"","fatigueintense":"","vomissement":"","diarrhee":"","perteOdorat":"","perteGout":"","autreSigne":"",},
    {"jj":"J5","date":"","temperature":"","toux":"","difficulteRespirer":"","malGorge":"","nezBouche":"","conjonctivite":"","mauxtete":"","douleurMusculaire":"","fatigueintense":"","vomissement":"","diarrhee":"","perteOdorat":"","perteGout":"","autreSigne":"",},
    {"jj":"J6","date":"","temperature":"","toux":"","difficulteRespirer":"","malGorge":"","nezBouche":"","conjonctivite":"","mauxtete":"","douleurMusculaire":"","fatigueintense":"","vomissement":"","diarrhee":"","perteOdorat":"","perteGout":"","autreSigne":"",},
    {"jj":"J7","date":"","temperature":"","toux":"","difficulteRespirer":"","malGorge":"","nezBouche":"","conjonctivite":"","mauxtete":"","douleurMusculaire":"","fatigueintense":"","vomissement":"","diarrhee":"","perteOdorat":"","perteGout":"","autreSigne":"",},
    {"jj":"J8","date":"","temperature":"","toux":"","difficulteRespirer":"","malGorge":"","nezBouche":"","conjonctivite":"","mauxtete":"","douleurMusculaire":"","fatigueintense":"","vomissement":"","diarrhee":"","perteOdorat":"","perteGout":"","autreSigne":"",},
    {"jj":"J9","date":"","temperature":"","toux":"","difficulteRespirer":"","malGorge":"","nezBouche":"","conjonctivite":"","mauxtete":"","douleurMusculaire":"","fatigueintense":"","vomissement":"","diarrhee":"","perteOdorat":"","perteGout":"","autreSigne":"",},
    {"jj":"J10","date":"","temperature":"","toux":"","difficulteRespirer":"","malGorge":"","nezBouche":"","conjonctivite":"","mauxtete":"","douleurMusculaire":"","fatigueintense":"","vomissement":"","diarrhee":"","perteOdorat":"","perteGout":"","autreSigne":"",},
    {"jj":"J11","date":"","temperature":"","toux":"","difficulteRespirer":"","malGorge":"","nezBouche":"","conjonctivite":"","mauxtete":"","douleurMusculaire":"","fatigueintense":"","vomissement":"","diarrhee":"","perteOdorat":"","perteGout":"","autreSigne":"",},
    {"jj":"J12","date":"","temperature":"","toux":"","difficulteRespirer":"","malGorge":"","nezBouche":"","conjonctivite":"","mauxtete":"","douleurMusculaire":"","fatigueintense":"","vomissement":"","diarrhee":"","perteOdorat":"","perteGout":"","autreSigne":"",},
    {"jj":"J13","date":"","temperature":"","toux":"","difficulteRespirer":"","malGorge":"","nezBouche":"","conjonctivite":"","mauxtete":"","douleurMusculaire":"","fatigueintense":"","vomissement":"","diarrhee":"","perteOdorat":"","perteGout":"","autreSigne":"",},
    {"jj":"J14","date":"","temperature":"","toux":"","difficulteRespirer":"","malGorge":"",
    "nezBouche":"","conjonctivite":"","mauxtete":"","douleurMusculaire":"","fatigueintense":"",
    "vomissement":"","diarrhee":"","perteOdorat":"","perteGout":"","autreSigne":"",},
  ]
  
 
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
  getLivreur(){
     this._adminService.getLivreur().then(res=>{
          if(res['status'] == true){
            this.listLivreur= res['message'];
            console.log(this.listLivreur)
          }
        })
  }
  displayAll(){
    this.patients = this.listeLivraison;
  }
  displayClient(){
    this.patients = [];
    for(let i of this.listeLivraison){
      //console.log(this.displayData(i.iduser,"accesslevel"))
      if(this.displayData(i.iduser,"accesslevel") == 3){
        console.log(i)
          this.patients.push(i)
        
      }
     
    }
  }
  displayEnlevement(){
    this.patients = [];
    for(let i of this.listeLivraison){
      //console.log(this.displayData(i.iduser,"accesslevel"))
      if(i.Etat == 2){
        console.log(i)
          this.patients.push(i)
        
      }
     
    }
  }
  displayAnnuler(){
    this.patients = [];
    for(let i of this.listeLivraison){
      //console.log(this.displayData(i.iduser,"accesslevel"))
      if(i.Etat == 9){
        console.log(i)
          this.patients.push(i)
        
      }
     
    }
  }
  displayRetour(){
    this.patients = [];
    for(let i of this.listeLivraison){
      //console.log(this.displayData(i.iduser,"accesslevel"))
      if(i.Etat == 8){
        console.log(i)
          this.patients.push(i)
        
      }
     
    }
  }
  displayLivre(){
    this.patients = [];
    let dd = ((new Date()).toJSON()).split("T",2)[0];

    for(let i of this.listeLivraison){
      //console.log(this.displayData(i.iduser,"accesslevel"))
      if(i.Etat == 4){
        if(i.last_modifield.includes(dd)){
        console.log(i)
          this.patients.push(i)
        }
        
      }
     
    }
  }
  displayEncours(){
    this.patients = [];
    for(let i of this.listeLivraison){
      //console.log(this.displayData(i.iduser,"accesslevel"))
      if(i.Etat == 3){
        console.log(i)
          this.patients.push(i)
        
      }
     
    }
  }
  displayAssigne(){
    this.patients = [];
    for(let i of this.listeLivraison){
      //console.log(this.displayData(i.iduser,"accesslevel"))
      if(i.Etat == 1){
        console.log(i)
          this.patients.push(i)
        
      }
     
    }
  }
  displayNouveau(){
    this.patients = [];
    for(let i of this.listeLivraison){
      //console.log(this.displayData(i.iduser,"accesslevel"))
      if(i.Etat == 0){
        console.log(i)
          this.patients.push(i)
        
      }
     
    }
  }
  
  displayCorporate(){
    this.patients = [];
    for(let i of this.listeLivraison){
      console.log(this.displayData(i.iduser,"accesslevel"))
      if(this.displayData(i.iduser,"accesslevel") == 4){
        this.patients.push(i)
      }
    }
  }
  ngOnInit() {
    if(localStorage.getItem("currentuser") == null){
      //this.router.navigate(['/']);
    }
    this.nbrNouveau = 0;
    this.nbrAssigne = 0;
    this.nbrLivre = 0;
    this.nbrCLivraison = 0;
    this.nbrCenlevement = 0;
    this.nbrretour = 0;
    this.nbrAnnuler = 0;
    let dd = ((new Date()).toJSON()).split("T",2)[0];
    //this._serviceAdmin.historique({dateDebut:dd,dateFin:dd})
    this._adminService.getLivraisonAdmin({dateDebut:dd,dateFin:dd}).then(res=>{
      this.patients = [];
      this.listLivreur = [];
      console.log(res['message']);
      if(res["status"] == true){
        this.patients = res['message'];
        this.listeLivraison =  res['message'];
        //this.nbrUsers = this.patients.length
        for(let i of this.patients){
          if(i.Etat == 0){
            this.nbrNouveau = this.nbrNouveau + 1;
          }
           if(i.Etat == 1){
            this.nbrAssigne = this.nbrAssigne + 1;
          }
           if(i.Etat == 2){
            this.nbrCenlevement = this.nbrCenlevement + 1;
          }
          if(i.Etat == 3){
            this.nbrCLivraison = this.nbrCLivraison + 1;
          }
           if(i.Etat == 4){
             if(i.last_modifield.includes(dd)){
              this.nbrLivre = this.nbrAssigne + 1;
             }
            
          }
          if(i.Etat == 8){
            this.nbrretour = this.nbrretour + 1;
          } 
          if(i.Etat == 9){
            this.nbrAnnuler = this.nbrAnnuler + 1;
          }
        }
       
      }
     
    })
    this._adminService.getUser().then(res=>{
      if(res['status'] == true){
        this.listUser= res['message'];
        console.log(this.listUser)
        console.log(this.displayData(14,"prenom"))
      }
    })
    setInterval(()=>{
      console.log("here we go")
      this.nbrNouveau = 0;
      this.nbrAssigne = 0;
      this.nbrLivre = 0;
      this.nbrCLivraison = 0;
      this.nbrCenlevement = 0;
      this.nbrretour = 0;
      this.nbrAnnuler = 0;
      this._adminService.getLivraisonAdmin({dateDebut:dd,dateFin:dd}).then(res=>{
        this.patients = [];
        this.listLivreur = [];
        console.log(res);
        if(res["status"] == true){
          this.patients = res['message'];
          //this.nbrUsers = this.patients.length
          for(let i of this.patients){
            if(i.Etat == 0){
              this.nbrNouveau = this.nbrNouveau + 1;
            }
             if(i.Etat == 1){
              this.nbrAssigne = this.nbrAssigne + 1;
            }
             if(i.Etat == 2){
              this.nbrCenlevement = this.nbrCenlevement + 1;
            }
            if(i.Etat == 3){
              this.nbrCLivraison = this.nbrCLivraison + 1;
            }
             if(i.Etat == 4){
               if(i.last_modifield.includes(dd)){
                this.nbrLivre = this.nbrAssigne + 1;
               }
              
            }
            if(i.Etat == 8){
             this.nbrretour = this.nbrretour + 1;
           }
           if(i.Etat == 9){
            this.nbrAnnuler = this.nbrAnnuler + 1;
          }
          }
         
        }
       
      })
    },180000)

  }
  public updateOptions() {
    this.myChartData.data.datasets[0].data = this.data;
    this.myChartData.update();
  }
  ids = [];
  datasSaves
  isInserted(a){
    for(let i of this.ids){
      if(i == a){
        return true;
      }
    }
    return false;
  }
  getIds(symptome,value){
    if(value == "non"){
      for(let i of this.symptomes){
        if(this.isInserted(i.id_patient)){
          this.ids.push(i.id_patient)
        }
      }
    }else{
      //for(for)
      if(symptome == 'mg'){

      }
    }
  }
  onKeyFiltreMG(event: any) { // without type info*
    this.datasSaves = this.patients;
    /*this.motif = event.target.value;
    let tabe = [];
    this.datass = [];

    if(this.motif.trim()=='')
      this.datass = this.datasSaves;
    else{
      this.datasSaves.forEach((ob)=>{
        if( ((ob.Malgorge).toLowerCase().search(this.motif.toLowerCase()) == 0)  ){
            tabe.push(ob);
        }
      })
      this.datass = tabe;
    }*/
    let tabe =[]
  if(this.ids.length == 0)
    this.patients = this.datasSaves;
  else{
    for(let i of this.datasSaves){
      for(let j of this.ids){
        if(i.id == j){
          tabe.push(i)
        }
      }
    }
    this.patients = tabe;
  }
    
}
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
