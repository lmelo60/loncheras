import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { ListHijosResponse } from '../../models/listHijos-response';
import { ChildrenService } from '../../services/children.service';
import { ListHijosRequest } from 'src/app/models/listHijos-request';
import { Hijo } from '../../models/hijo';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  hijos: boolean;

  myForm: FormGroup;

  listarHijos: Observable<ListHijosResponse>;
  responseListarHijos: ListHijosResponse;

  agregarHijo: Observable<Hijo>;
  responseHijo: Hijo;

  constructor(private fb: FormBuilder, private spinner: NgxSpinnerService, private service: ChildrenService) {
    console.log('constructor exitoso');

    this.myForm = fb.group({
      nombre: [null, Validators.required],
      edad: [null, Validators.required],
      peso: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    console.log('ngOnInit exitoso');
    this.tieneHijos();
    this.spinner.show();
  }

  tieneHijos(): void {
    this.hijos =  false;
    let usertoken = localStorage.getItem('usertoken');
    if (usertoken !== '') {
      usertoken = atob(usertoken);
      const aux = usertoken.split(';');
      usertoken = aux['1'];
      let usuario: number;
      usuario = +usertoken;
      let request: ListHijosRequest;
      request = {
        UsuarioId: usuario
      };

      this.listarHijos = this.service.listarHijos(request);
      this.listarHijos.subscribe( results => {
        this.responseListarHijos = results;
        if (this.responseListarHijos.SDTHijos.length > 0) {
          localStorage.setItem('hijos', JSON.stringify(this.responseListarHijos.SDTHijos));
          this.spinner.hide();
          this.hijos =  true;
        } else {
          this.hijos =  false;
          this.spinner.hide();
        }
      }, err => {
        console.log('**********************' + JSON.parse(err));
        this.spinner.hide();
        this.hijos =  false;
      });
    }
  }

  isPersonalDataFieldValid(field: string) {
    return !this.myForm.get(field).valid && this.myForm.get(field).touched;
  }

  doSomething() {
    this.spinner.show();
    let usertoken = localStorage.getItem('usertoken');
    usertoken = atob(usertoken);
    const aux = usertoken.split(';');
    usertoken = aux['1'];
    let usuario: number;
    usuario = +usertoken;
    let request: Hijo;
    request = {
      HijoEdad: this.myForm.get('edad').value,
      HijoNombre: this.myForm.get('nombre').value,
      HijoPeso: this.myForm.get('peso').value,
      UsuarioId: usuario
    };
    this.agregarHijo = this.service.insertarHijo(request);
    this.agregarHijo.subscribe( results => {
      this.responseHijo = results;
      if (this.responseHijo.gx_md5_hash !== '') {
        this.hijos = true;
        this.spinner.hide();
      }
    }, err => {
      console.log('**********************' + JSON.parse(err));
      this.spinner.hide();
      this.hijos =  false;
    });
  }

  oneMore() {
    this.spinner.show();
    let usertoken = localStorage.getItem('usertoken');
    usertoken = atob(usertoken);
    const aux = usertoken.split(';');
    usertoken = aux['1'];
    let usuario: number;
    usuario = +usertoken;
    let request: Hijo;
    request = {
      HijoEdad: this.myForm.get('edad').value,
      HijoNombre: this.myForm.get('nombre').value,
      HijoPeso: this.myForm.get('peso').value,
      UsuarioId: usuario
    };
    this.agregarHijo = this.service.insertarHijo(request);
    this.agregarHijo.subscribe( results => {
      this.responseHijo = results;
      if (this.responseHijo.gx_md5_hash !== '') {
        this.myForm.get('nombre').reset();
        this.myForm.get('edad').reset();
        this.myForm.get('peso').reset();
        this.spinner.hide();
      }
    }, err => {
      console.log('**********************' + JSON.parse(err));
      this.spinner.hide();
    });
  }

}
