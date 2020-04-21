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

  constructor( private http: HttpClient ) {
    console.log('service ready');
    this.url = 'https://wgsoft.tech/AppLoncheras/rest/Usuario/0';
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

}
