import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ListHijosRequest } from '../models/listHijos-request';
import { Observable } from 'rxjs';
import { ListHijosResponse } from '../models/listHijos-response';

@Injectable({
  providedIn: 'root'
})
export class ChildrenService {

  urlListarHijos = '';

  constructor(private http: HttpClient) {
    console.log('service ready');
    this.urlListarHijos = 'https://wgsoft.tech/AppLoncheras/rest/ListarHijos';
   }

   listarHijos(request: ListHijosRequest): Observable<ListHijosResponse> {

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );

    return this.http.post<ListHijosResponse>(this.urlListarHijos,
      request,
      { headers }
    );
   }

}
