import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { SignupService } from '../../services/signup.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserRequest } from '../../models/user-request';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {

  myForm: FormGroup;

  errorChange: boolean;

  constructor(private fb: FormBuilder, private service: SignupService, private router: Router, private spinner: NgxSpinnerService) {

    this.errorChange = false;

    this.myForm = fb.group({
      passwords: this.fb.group({
        contrasena: [null, Validators.required],
        recontrasena: [null, Validators.required]
    }, {validator: this.passwordConfirming})
    });

   }

  ngOnInit(): void {
  }

  doSomething() {
    this.spinner.show();
    let request: UserRequest;
    request = {
      UsuarioId : +atob(sessionStorage.getItem('identifier2')),
      ContrasenaNueva : this.myForm.get('passwords.contrasena').value
    };
    let llamar;
    llamar = this.service.changePass(request);
    llamar.subscribe( results => {
      if (results.RespuestaActualizar.Codigo === 1) {
        this.errorChange = false;
        sessionStorage.removeItem('identifier1');
        sessionStorage.removeItem('identifier2');
        this.spinner.hide();
        this.router.navigate(['inicio']);
      } else {
        this.errorChange = true;
        this.spinner.hide();
      }
    }, error => {
      this.errorChange = true;
      console.log('**********************' + error);
      this.spinner.hide();
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
