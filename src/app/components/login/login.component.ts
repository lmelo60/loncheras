import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginResponse } from '../../models/login-response';
import { Observable } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/models/login-request';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;

  loginUser: Observable<LoginResponse>;
  response: LoginResponse;

  constructor(private fb: FormBuilder, private service: LoginService, private router: Router, private spinner: NgxSpinnerService) {
    console.log('constructor exitoso');
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
      if (this.response.Respuesta !== '') {
        this.spinner.hide();
        this.router.navigate(['inicio/principal']);
      }
    }, err => {
      this.spinner.hide();
      console.log('**********************' + err);
    });
  }

  isPersonalDataFieldValid(field: string) {
    return !this.myForm.get(field).valid && this.myForm.get(field).touched;
  }

}
