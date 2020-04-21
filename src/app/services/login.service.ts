import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest } from '../models/login-request';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = '';

  constructor(private http: HttpClient) {
    console.log('service ready');
    this.url = 'https://wgsoft.tech/AppLoncheras/rest/Logueo';
   }

   login(request: LoginRequest): Observable<LoginResponse> {

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );

    return this.http.post<LoginResponse>(this.url,
      request,
      { headers }
    );
   }

}
