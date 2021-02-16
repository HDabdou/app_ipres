import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: "app-notifications",
  templateUrl: "notifications.component.html"
})
export class NotificationsComponent implements OnInit {

  listHistorique:any = [];
  constructor(private _serviceAdmin: AdminService,private router:Router) {}


  
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
  getFormule(arg){
    if(arg == 1){
      return "Maana";
    }if(arg == 2){
      return "Boul-khool";
    }if(arg == 3){
      return "Maana + Boul-khool";
    }
  }
   download(){
    //let line = 
    this.errorMessage = 0
    let liste = []
  
      for(let i of this.listHistorique){
        //console.log({date:this.getDate(i.dateoperation),service:i.operateur,traitement:i.traitement,montant:i.montant,client:this.trimer(i.infoclient)});
        liste.push(
          {
            date:i.datelivraison,
            prenom_nom_demandeur:i.prenomDemandeur.replaceAll(","," ")+" "+i.nomDemandeur.replaceAll(","," "),
            telephone_demandeur:i.telephoneDemandeur.replaceAll(","," "),
            adresse_demandeur:i.pointDepart.replaceAll(","," "),
            designation:i.designation.replaceAll(","," "),
            prenom_nom_destinataire:i.prenomDestinataire.replaceAll(","," ")+" "+i.nomDestinatair.replaceAll(","," "),
            telephone_destinataire:i.telephoneDestinataire.replaceAll(","," "),
            adresse_destinatiare:i.adresselivraison.replaceAll(","," "),
            Montant:i.Montant,
            mode_paiement:i.mode_paiement,
          }
        );
      }
      console.log(liste);
      //console.log(this.ConvertToCSV(liste));
      var csvData = this.ConvertToCSV(liste);
      var a = document.createElement("a");
      a.setAttribute('style', 'display:none;');
      document.body.appendChild(a);
      var blob = new Blob([csvData], { type: 'text/csv' });
      var url= window.URL.createObjectURL(blob);
      a.href = url;
      a.download = 'report_'+(new Date().toLocaleString())+'.csv';/* your file name*/
      a.click();
      console.log(csvData);
      this.errorMessage = 2
      return 'success';
    
 
   
    
  }
  ngOnInit() {
    if(localStorage.getItem("currentuser") == null){
      this.router.navigate(['/']);
    }
    let dd = ((new Date()).toJSON()).split("T",2)[0];
    this._serviceAdmin.historique({dateDebut:dd,dateFin:dd}).then(res=>{
      console.log(res);
      if(res['status'] == true){
        this.listHistorique = res['message'];
      }
    })
  }
}
