import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginResponse } from '../../models/login-response';
import { Observable } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/models/login-request';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [DatePipe]
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;

  loginDate: any;

  errorLogin: boolean;

  loginUser: Observable<LoginResponse>;
  response: LoginResponse;

  constructor(private fb: FormBuilder, private service: LoginService, private router: Router,
              private spinner: NgxSpinnerService, private datePipe: DatePipe) {
    console.log('constructor exitoso');
    this.errorLogin = false;
    this.myForm = fb.group({
      usuario: [null, Validators.required],
      contrasena: [null, Validators.required]
    });
   }

  ngOnInit(): void {
  }

  doSomething() {
    this.spinner.show();
    let request: LoginRequest;
    request = {
      UsuarioCorreo: this.myForm.get('usuario').value,
     UsuarioPassword: this.myForm.get('contrasena').value
    };

    this.loginUser = this.service.login(request);
    this.loginUser.subscribe( results => {
      this.response = results;
      if (this.response.Respuesta.RoleId === 0  && this.response.Respuesta.UsuarioId !== '0') {
        this.errorLogin = false;
        this.loginDate = new Date();
        this.loginDate = this.datePipe.transform(this.loginDate, 'dd-MM-yyyy HH:mm:ss');
        let usertoken = this.loginDate + ';' + this.response.Respuesta.UsuarioId;
        console.log(usertoken);
        usertoken = btoa(usertoken);
        localStorage.setItem('usertoken', usertoken);
        this.spinner.hide();
        this.router.navigate(['inicio/principal']);
      } else if (this.response.Respuesta.RoleId === 0) {
        this.spinner.hide();
        this.router.navigate(['inicio/gestion']);
      } else {
        this.errorLogin = true;
        this.spinner.hide();
      }
    }, error => {
      this.spinner.hide();
      console.log('**********************' + error);
      this.router.navigate(['inicio']);
    });
  }

  isPersonalDataFieldValid(field: string) {
    return !this.myForm.get(field).valid && this.myForm.get(field).touched;
  }

}
