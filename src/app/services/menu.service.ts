import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Combo } from '../models/combo-response';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  urlListarCombos = '';

  constructor(private http: HttpClient) {
    console.log('service ready');
    this.urlListarCombos = 'https://wgsoft.tech/AppLoncheras/rest/ListaCombos';
   }

   listarMenu(): Observable<Array<Combo>> {

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );

    return this.http.get<Array<Combo>>(this.urlListarCombos,
      { headers }
      );
   }

}
