import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminMakerService {
/*************************************************** */
// *****************Service admin général maker**************
/*************************************************** */


  //l'url de base
  private url = "http://apitnt.bbstvnet.com/index.php";
  //Headers
  private header :HttpHeaders;

  constructor(private http: HttpClient) {
    this.header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

   }
   
   // CreateUser est une fonction de création des utilisateurs : Vérificatteur, Opérateur et client
   public createUser(param): Promise<any>{
    let params="param="+JSON.stringify(param);
    console.log(params);
    
    let link=this.url+"/ipres/admin/createuser";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(JSON.stringify(res)); return res} ).catch(error => {console.log(error); return 'bad' });
  }
  // deleteUser supprimé un utilisateur
  public deleteUser(param): Promise<any>{
     let params="param="+JSON.stringify(param);
     console.log(params);
     
     let link=this.url+"/ipres/admin/deleteUser";
     return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(JSON.stringify(res)); return res} ).catch(error => {console.log(error); return 'bad' });
   } 
   //Traiter Réclamation
   public traiterReclamation(param): Promise<any>{
    let params="param="+JSON.stringify(param);
    console.log(params);
    
    let link=this.url+"/ipres/admin/traiterReclamation";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(JSON.stringify(res)); return res} ).catch(error => {console.log(error); return 'bad' });
  } 
   //updateUser permet de modifier un user
  public updateUser(param): Promise<any>{
    let params="param="+JSON.stringify(param);
    console.log(params);
    
    let link=this.url+"/ipres/admin/updateUser";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(JSON.stringify(res)); return res} ).catch(error => {console.log(error); return 'bad' });
  } 
  //saveUpload permet d'enregistrer sur la base le fichier upload
  public saveUpload(param): Promise<any>{
    let params="param="+JSON.stringify(param);
    console.log(params);
    
    let link=this.url+"/ipres/admin/saveUpload";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(JSON.stringify(res)); return res} ).catch(error => {console.log(error); return 'bad' });
  } 
    // getAllUsers est une fonction qui permet de récuperer tous les utilisateurs sauf admin général
    public getAllUsers(): Promise<any>{
      let params //="param="+JSON.stringify(param);
      console.log(params);
      
      let link=this.url+"/ipres/admin/getAllUsers";
      return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(JSON.stringify(res)); return res} ).catch(error => {console.log(error); return 'bad' });
    } 
    // getReclamation pour obtenir la liste des réclamation 
    public getReclamation(): Promise<any>{
      let params //="param="+JSON.stringify(param);
      console.log(params);
      
      let link=this.url+"/ipres/admin/getReclamation";
      return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(JSON.stringify(res)); return res} ).catch(error => {console.log(error); return 'bad' });
    } 


    //getUserByOperateur permet de recupérer le utilisateur créer par l'opérateur
    public getUserByOperateur(param): Promise<any>{
      let params ="param="+JSON.stringify(param);
      console.log(params);
      
      let link=this.url+"/ipres/operateur/getUserByOperateur";
      return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(JSON.stringify(res)); return res} ).catch(error => {console.log(error); return 'bad' });
    } 
     //getUserByOperateur permet de recupérer les opération d'un  utilisateur 
     public getOperationByClient(param): Promise<any>{
      let params ="param="+JSON.stringify(param);
      console.log(params);
      
      let link=this.url+"/ipres/operateur/getOperationByClient";
      return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(JSON.stringify(res)); return res} ).catch(error => {console.log(error); return 'bad' });
    } 
    
    
    public initReclamation(param): Promise<any>{
      let params ="param="+JSON.stringify(param);
      console.log(params);
      
      let link=this.url+"/ipres/operateur/initReclamation";
      return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(JSON.stringify(res)); return res} ).catch(error => {console.log(error); return 'bad' });
    } 
    public getReclamationByOperateur(param): Promise<any>{
      let params ="param="+JSON.stringify(param);
      console.log(params);
      
      let link=this.url+"/ipres/operateur/getReclamationByOperateur";
      return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(JSON.stringify(res)); return res} ).catch(error => {console.log(error); return 'bad' });
    } 
    // updateReclamationOp permet demodifier les opération
    public updateReclamationOp(param): Promise<any>{
      let params ="param="+JSON.stringify(param);
      console.log(params);
      
      let link=this.url+"/ipres/operateur/updateReclamationOp";
      return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(JSON.stringify(res)); return res} ).catch(error => {console.log(error); return 'bad' });
    } 
    public activerClient(param): Promise<any>{
      let params ="param="+JSON.stringify(param);
      console.log(params);
      
      let link=this.url+"/ipres/admin/activerClient";
      return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(JSON.stringify(res)); return res} ).catch(error => {console.log(error); return 'bad' });
    } 
    // getPaymentByInterval permet de recuperer les paiements par intervalle
    public getPaymentByInterval(param): Promise<any>{
      let params ="param="+JSON.stringify(param);
      console.log(params);
      
      let link=this.url+"/ipres/admin/getPaymentByInterval";
      return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res); return res} ).catch(error => {console.log(error); return 'bad' });
    } 
    
    
      
}
