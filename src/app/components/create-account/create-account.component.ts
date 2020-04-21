import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SignupService } from '../../services/signup.service';
import { Observable } from 'rxjs';
import { UserResponse } from '../../models/user-response';
import { UserRequest } from 'src/app/models/user-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  myForm: FormGroup;

  signUser: Observable<UserResponse>;
  response: UserResponse;

  constructor(private fb: FormBuilder, private service: SignupService, private router: Router) {
    console.log('constructor exitoso');
    this.myForm = fb.group({
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      celular: [null, Validators.required],
      direccion: [null, Validators.required],
      complementario: [null, null],
      contrasena: [null, Validators.required],
      recontrasena: [null, Validators.required]
    });
   }

  ngOnInit(): void {
    console.log('ngOnInit exitoso');
  }

  doSomething() {
    let request: UserRequest;
    request = {
      UsuarioApellido: this.myForm.get('apellido').value,
      UsuarioCelular: this.myForm.get('celular').value,
      UsuarioCorreo: this.myForm.get('email').value,
      UsuarioDireccion: this.myForm.get('direccion').value + this.myForm.get('complementario').value,
      UsuarioFechaNacimiento: '1994-10-24',
      UsuarioNombre: this.myForm.get('nombre').value,
      UsuarioPassword: this.myForm.get('contrasena').value
    };

    this.signUser = this.service.createNewUser(request);
    this.signUser.subscribe( results => {
      this.response = results;
      if (this.response.gx_md5_hash !== '') {
        this.router.navigate(['inicio']);
      }
    }, err => {
      console.log('**********************' + err);
    });

  }

  isPersonalDataFieldValid(field: string) {
    return !this.myForm.get(field).valid && this.myForm.get(field).touched;
  }


}
