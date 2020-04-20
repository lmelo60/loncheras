import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor( private http: HttpClient ) {
    console.log('service ready');
   }

  createNewUser() {
    const url = 'http://wgsoft.tech:8080/AppLoncheras/rest/Usuario/0';
  }

}
