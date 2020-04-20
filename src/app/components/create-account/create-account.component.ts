import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SignupService } from '../../services/signup.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  myForm: FormGroup;

  constructor(private fb: FormBuilder, private _service:SignupService) {
    console.log('constructor exitoso');
   }

  ngOnInit(): void {
    console.log('ngOnInit exitoso');
    this.myForm = this.fb.group({
      nombrec: new FormControl('', [Validators.required]),
      apellidoc: new FormControl('', [Validators.required]),
      emailc: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      celularc: new FormControl('', [Validators.required]),
      direccionc: new FormControl('', [Validators.required]),
      complementarioc: new FormControl(''),
      contrasenac: new FormControl('', [Validators.required]),
      recontrasenac: new FormControl('', [Validators.required])
    });
  }

  doSomething() {
    const email = this.myForm.get('emailc').value;
    console.log('**********************' + email);
  }

}
