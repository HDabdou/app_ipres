import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  configUrl = 'http://www.cloudpharma.org/backendpharma/public/index.php/api/produit/getBuyedProducts';

  constructor(private _http: HttpClient) { }

  getAllReclamations (){
    console.log('service reclamation');
    return this._http.post(this.configUrl,{});
  }
}
