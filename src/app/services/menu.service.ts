import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Combo } from '../models/combo-response';
import { AlimentosResponse } from '../models/alimentos-response';
import { SolicitudResponse } from '../models/solicitud-response';
import { SolicitudRequest } from '../models/solicitud-request';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  urlListarCombos = '';
  urlListarAlimentos = '';
  urlSolicitud = '';

  constructor(private http: HttpClient) {
    console.log('service ready');
    this.urlListarCombos = 'https://wgsoft.tech/AppLoncheras/rest/ListaCombos';
    this.urlListarAlimentos = 'https://wgsoft.tech/AppLoncheras/rest/ListaAlimentos';
    this.urlSolicitud = 'https://wgsoft.tech/AppLoncheras/rest/Solicitud/0';
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

   listarAlimentos(): Observable<Array<AlimentosResponse>> {

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );

    return this.http.get<Array<AlimentosResponse>>(this.urlListarAlimentos,
      { headers }
      );
   }

   crearSolicitud(request: SolicitudRequest): Observable<SolicitudResponse> {

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );

    return this.http.post<SolicitudResponse>(this.urlSolicitud,
        request,
      { headers }
      );
   }

}
