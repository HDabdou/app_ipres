import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  private url = "http://livraison.bbstvnet.com/index.php";
  private header :HttpHeaders;

  constructor(private http: HttpClient) {
    this.header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

   }
   
   public getLivraisonAdmin(param): Promise<any>{
     let params="requestParam="+JSON.stringify(param);
     console.log(params);
     
     let link=this.url+"/admin/getLivraisonAdmin";
     return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res); return res} ).catch(error => {console.log(error); return 'bad' });
   } 
   public getCorporate(): Promise<any>{
     let params//="requestParam="+JSON.stringify(param);
     console.log(params);
     
     let link=this.url+"/admin/getCorporate";
     return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res); return res} ).catch(error => {console.log(error); return 'bad' });
   } 
   public getUser(): Promise<any>{
     let params//="requestParam="+JSON.stringify(param);
     console.log(params);
     
     let link=this.url+"/admin/getUser";
     return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res); return res} ).catch(error => {console.log(error); return 'bad' });
   } 
   
   public historique(param) :Promise<any>{
    let params="requestParam="+JSON.stringify(param);
    console.log(params);
    
    let link=this.url+"/admin/historique";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res); return res} ).catch(error => {console.log(error); return 'bad' });
  } 
  public motDePassOublie(param) :Promise<any>{
   let params="param="+JSON.stringify(param);
   console.log(params);
   
    let link=this.url+"/admin/motDePassOublie";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res); return res} ).catch(error => {console.log(error); return 'bad' });
  } 
  public updateUser(param) :Promise<any>{
    let params="requestParam="+JSON.stringify(param);
    console.log(params);
    
    let link=this.url+"/admin/updateUser";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res); return res} ).catch(error => {console.log(error); return 'bad' });
  } 
  public deleteLivraisonByAdmin(param) :Promise<any>{
    let params="requestParam="+JSON.stringify(param);
    console.log(params);
    
    let link=this.url+"/admin/deleteLivraisonByAdmin";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res); return res} ).catch(error => {console.log(error); return 'bad' });
  } 
  public deleteUser(param) :Promise<any>{
    let params="requestParam="+JSON.stringify(param);
    console.log(params);
    
    let link=this.url+"/admin/deleteUser";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res); return res} ).catch(error => {console.log(error); return 'bad' });
  } 
  
  public getLivraisonLivreur(param) :Promise<any>{
    let params="param="+JSON.stringify(param);
    console.log(params);
    
    let link=this.url+"/admin/getLivraisonLivreur";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res); return res} ).catch(error => {console.log(error); return 'bad' });
  } 
  
  public reinitialiserPassword(param) :Promise<any>{
    let params="param="+JSON.stringify(param);
    console.log(params);
    
    let link=this.url+"/admin/reinitialiserPassword";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res); return res} ).catch(error => {console.log(error); return 'bad' });
  } 
  public getLivraisonPro(param) :Promise<any>{
    let params="param="+JSON.stringify(param);
    console.log(params);
    
    let link=this.url+"/admin/getLivraisonPro";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res); return res} ).catch(error => {console.log(error); return 'bad' });
  } 
  public getLivreur(): Promise<any>{
    let params//="requestParam="+JSON.stringify(param);
    console.log(params);
    
    let link=this.url+"/admin/getLivreur";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => { return res} ).catch(error => {console.log(error); return 'bad' });
  } 
  public assignation(param): Promise<any>{
    let params="requestParam="+JSON.stringify(param);
    console.log(params);
    
    let link=this.url+"/admin/assignation";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => { return res} ).catch(error => {console.log(error); return 'bad' });
  } 
  public checkLogin(param): Promise<any>{
    let params="requestParam="+JSON.stringify(param);
    console.log(params);
    
    let link=this.url+"/admin/checkLogin";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => { return res} ).catch(error => {console.log(error); return 'bad' });
  } 
  public inscription(param): Promise<any>{
    let params="param="+JSON.stringify(param);
    console.log(params);
    
    let link=this.url+"/admin/inscription";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => { return res} ).catch(error => {console.log(error); return 'bad' });
  } 
  public inscriptionCorporate(param): Promise<any>{
    let params="param="+JSON.stringify(param);
    console.log(params);
    let link=this.url+"/admin/inscriptionCorporate";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => { return res} ).catch(error => {console.log(error); return 'bad' });
  } 
  
  public retourEtAnnuler(param): Promise<any>{
    let params="requestParam="+JSON.stringify(param);
    console.log(params);
    //let url1 = "http://localhost:8088/api_livraison/index.php/livraison/retourEtAnnuler"
    let link=this.url+"/admin/retourEtAnnuler";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => { return res} ).catch(error => {console.log(error); return 'bad' });
  } 
  public login(param): Promise<any>{
    let params="param="+JSON.stringify(param);
    console.log(params);
    
    let link=this.url+"/admin/login";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => { return res} ).catch(error => {console.log(error); return 'bad' });
  } 
  public changePassword(param): Promise<any>{
    let params="param="+JSON.stringify(param);
    console.log(params);
    let link=this.url+"/admin/changePassword";
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => { return res} ).catch(error => {console.log(error); return 'bad' });
  } 
}
