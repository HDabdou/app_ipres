import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminMakerService {

  private url = "http://localhost:8088/midleware_ipres/index.php";
  private header :HttpHeaders;

  constructor(private http: HttpClient) {
    this.header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

   }
   
   public createUser(param): Promise<any>{
     let params="param="+JSON.stringify(param);
     console.log(params);
     
     let link=this.url+"/ipres/createuser";
     return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res); return res} ).catch(error => {console.log(error); return 'bad' });
   } 
   
}
