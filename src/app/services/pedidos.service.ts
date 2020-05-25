import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SolicitudResponse } from '../models/solicitud-response';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  url = '';

  constructor(private http: HttpClient) {
    console.log('service ready');
    this.url = 'https://wgsoft.tech/AppLoncheras/rest/ListarSolicitudes';
   }

   listarMenu(): Observable<Array<SolicitudResponse>> {

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );

    return this.http.get<Array<SolicitudResponse>>(this.url,
      { headers }
      );
  }
}
