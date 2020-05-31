import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { SignupService } from '../../services/signup.service';
import { UserRequest } from '../../models/user-request';
import { LoginResponse } from '../../models/login-response';

@Component({
  selector: 'app-identifier',
  templateUrl: './identifier.component.html',
  styleUrls: ['./identifier.component.css']
})
export class IdentifierComponent implements OnInit {

  myForm: FormGroup;

  response: LoginResponse;

  errorIdentifier: boolean;

  constructor(private fb: FormBuilder, private service: SignupService, private router: Router, private spinner: NgxSpinnerService) {
    this.errorIdentifier = false;
    this.myForm = fb.group({
      celular: [null, Validators.required],
      fecha: [null, Validators.required]
    });
   }

  ngOnInit(): void {
  }

  declinar() {
    this.router.navigate(['inicio']);
  }

  doSomething() {
    this.spinner.show();
    let request: UserRequest;
    request = {
      UsuarioCelular : this.myForm.get('celular').value,
      UsuarioFechaNacimiento : this.myForm.get('fecha').value
    };
    let llamar;
    llamar = this.service.identifier(request);
    llamar.subscribe( results => {
      this.response = results;
      if (this.response.Respuesta.RoleId === 0  && this.response.Respuesta.UsuarioId !== '0') {
        this.errorIdentifier = false;
        sessionStorage.setItem('identifier1', btoa(this.response.Respuesta.RoleId + ''));
        sessionStorage.setItem('identifier2', btoa(this.response.Respuesta.UsuarioId + ''));
        this.spinner.hide();
        this.router.navigate(['inicio/Actualizar']);
      } else if (this.response.Respuesta.RoleId === 0  && this.response.Respuesta.UsuarioId === '0') {
        this.errorIdentifier = true;
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
