import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private url = "https://bbdaa1662e4a.ngrok.io/midleware_ipres/index.php";
  private header :HttpHeaders;

  constructor(private http: HttpClient) {
    this.header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

   }


  public getAllReclamations(param): Promise<any>{
    let params="requestParam="+JSON.stringify(param);
    console.log(params);
    let link=this.url+ '/ipres/verificateur/getReclamation';
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res); return res} ).catch(error => {console.log(error); return 'bad' });
  } 

  public setTraiterReclamation(param): Promise<any>{
    let params="param="+JSON.stringify(param);
    console.log(params);
    let link=this.url+ '/ipres/verificateur/updateReclamationVerif';
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res); return res} ).catch(error => {console.log(error); return 'bad' });
  } 
}
