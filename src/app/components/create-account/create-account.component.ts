import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SignupService } from '../../services/signup.service';
import { Observable } from 'rxjs';
import { UserResponse } from '../../models/user-response';
import { UserRequest } from 'src/app/models/user-request';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  myForm: FormGroup;

  signUser: Observable<UserResponse>;
  response: UserResponse;

  constructor(private fb: FormBuilder, private service: SignupService, private router: Router, private spinner: NgxSpinnerService) {
    console.log('constructor exitoso');
    this.myForm = fb.group({
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      celular: [null, Validators.required],
      direccion: [null, Validators.required],
      complementario: [null, null],
      passwords: this.fb.group({
        contrasena: [null, Validators.required],
        recontrasena: [null, Validators.required]
    }, {validator: this.passwordConfirming})
    });
   }

  ngOnInit(): void {
    console.log('ngOnInit exitoso');
  }

  doSomething() {
    this.spinner.show();
    let request: UserRequest;
    request = {
      UsuarioApellido: this.myForm.get('apellido').value,
      UsuarioCelular: this.myForm.get('celular').value,
      UsuarioCorreo: this.myForm.get('email').value,
      UsuarioDireccion: this.myForm.get('direccion').value + this.myForm.get('complementario').value,
      UsuarioFechaNacimiento: '1994-10-24',
      UsuarioNombre: this.myForm.get('nombre').value,
      UsuarioPassword: this.myForm.get('passwords.contrasena').value,
      RoleId: 0
    };

    this.signUser = this.service.createNewUser(request);
    this.signUser.subscribe( results => {
      this.response = results;
      if (this.response.gx_md5_hash !== '') {
        this.spinner.hide();
        this.router.navigate(['inicio']);
      }
    }, err => {
      this.spinner.hide();
      console.log('**********************' + err);
    });

  }

  get passwords() { return this.myForm.get('passwords'); }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('contrasena').value !== c.get('recontrasena').value) {
        return {invalid: true};
    }
  }

  isPersonalDataFieldValid(field: string) {
    return !this.myForm.get(field).valid && this.myForm.get(field).touched;
  }


}
