import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  hijos: boolean;

  myForm: FormGroup;

  constructor(private fb: FormBuilder, private spinner: NgxSpinnerService) {
    console.log('constructor exitoso');
    this.hijos = this.tieneHijos();

    this.myForm = fb.group({
      nombre: [null, Validators.required],
      edad: [null, Validators.required],
      peso: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  tieneHijos(): boolean {
    return false;
  }

  isPersonalDataFieldValid(field: string) {
    return !this.myForm.get(field).valid && this.myForm.get(field).touched;
  }

  doSomething() {
  }

  oneMore() {}

}
