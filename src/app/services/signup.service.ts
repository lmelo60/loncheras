import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserRequest } from '../models/user-request';
import { Observable } from 'rxjs';
import { UserResponse } from '../models/user-response';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  url = '';
  urlIdentifier = '';
  urlChange = '';

  constructor( private http: HttpClient ) {
    console.log('service ready');
    this.url = 'https://wgsoft.tech/AppLoncheras/rest/Usuario/0';
    this.urlIdentifier = 'https://wgsoft.tech/AppLoncheras/rest/RecuperaContrasena';
    this.urlChange = 'https://wgsoft.tech/AppLoncheras/rest/ActualizaContrasena';
  }

  createNewUser(request: UserRequest): Observable<UserResponse> {

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );

    return this.http.post<UserResponse>(this.url,
      request,
      { headers }
    );
  }

  identifier(request: UserRequest) {

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );

    return this.http.post(this.urlIdentifier,
      request,
      { headers }
    );
  }

  changePass(request: UserRequest) {

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );

    return this.http.post(this.urlChange,
      request,
      { headers }
    );
  }

}
