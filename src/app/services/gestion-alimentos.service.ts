import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlimentoRq } from '../models/alimento-request';
import { AlimentoRs } from '../models/alimento-response';

@Injectable({
  providedIn: 'root'
})
export class GestionAlimentosService {

  url = '';

  constructor(private http: HttpClient) {
    console.log('service ready');
    this.url = 'https://wgsoft.tech/AppLoncheras/rest/Alimento/0';
   }

   agregar(request: AlimentoRq): Observable<AlimentoRs> {

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );

    return this.http.post<AlimentoRs>(this.url,
      request,
      { headers }
    );

   }
}
