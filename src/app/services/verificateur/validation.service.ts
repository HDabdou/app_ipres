import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  configUrl = 'https://bae423df4c3f.ngrok.io/midleware_ipres/index.php';

  constructor(private _http: HttpClient) { }

  getAllReclamations (){
    console.log('service reclamation');
    return this._http.post(this.configUrl+'/ipres/verificateur/getReclamation',{});
  }
}
