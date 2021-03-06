import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthentificationProvider } from '../authentification/authentification';

/*
  Generated class for the ReclamationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReclamationProvider {
  _headers: HttpHeaders;
  token;
  constructor(public http: HttpClient, private _authService:AuthentificationProvider) {
    this._headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    this._headers.set('Accept-Charset', 'utf-8');
    this._authService.getToken().then((val)=>{
      console.log(val);
      this.token = val ;
    }).catch((err)=>{
      console.log(err);
    })
    console.log('Hello ReclamationProvider Provider');
    // need boostup the token getter to ovied undefined value ..... FIX-NEXT
    // token bech n5arjoh mena 5ater sa3at yab9a chwaya bech yarja3 el value w akeka twali ysir el appl bel value = undefined
  }

  getReclamationList(token:string){
    let url = "http://localhost:8000/api/reclamation/?token=" + token;
    console.log(url);
    return this.http.get(url, { headers: this._headers })

  }

  getReclamationInfo(id: string, token: String){
    let url = "http://localhost:8000/api/reclamation/"+id+"?token=" + token;
    console.log(url);
    return this.http.get(url, { headers: this._headers })


  }

  sendReclamation(reclamation,token){
    let sujet = reclamation.sujet;
    let contenu = reclamation.contenu;
    let image= reclamation.image;
    let date = reclamation.date;
    let lat = reclamation.lat;
    let long = reclamation.long;
    let url = "http://localhost:8000/api/reclamation/new";
    const __headers = new HttpHeaders().set('Content-Type', 'application/json');

    const body = new HttpParams()
      .set('token', token)
      .set('contenu', contenu)
      .set('image', image)
      .set('lat', lat)
      .set('lng', long)
      .set('commune',reclamation.commune)
    const bodyV2 = {
     token:token,
     contenu : contenu,
     image: image,
     lat: lat,
     lng: long,
     commune: reclamation.commune,
    }
    return this.http.post(url, bodyV2, { headers: __headers });
  }
  public Delete_Reclamation(id,token) {
    let url = "http://localhost:8000/api/reclamation/"+id;
    //this._headers.set("token",token);
    this._headers = this._headers.append('token', token);
    let headerAbc = new HttpHeaders({ 'token': token });
    return this.http.delete(url, { headers: headerAbc });

    //method delete
  }

}
