import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private url = "https://7e7b433878cb.ngrok.io/midleware_ipres/index.php";
  private header :HttpHeaders;

  constructor(private http: HttpClient) {
    this.header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

   }


  public getPaymentByInterval (param): Promise<any>{
    let params="param="+JSON.stringify(param);
    console.log(params);
    let link=this.url+ '/ipres/verificateur/getPaymentByInterval';
    return this.http.post(link,params,{headers:this.header}).toPromise().then( res => {console.log(res); return res} ).catch(error => {console.log(error); return 'bad' });
  } 

}
