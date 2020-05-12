import { Component, OnInit } from '@angular/core';
import { Hijo } from '../../models/hijo';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChildrenService } from '../../services/children.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { ListHijosResponse } from '../../models/listHijos-response';
import { ListHijosRequest } from '../../models/listHijos-request';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.css']
})
export class InfoUserComponent implements OnInit {

  SDTHijos: Array<Hijo>;
  form: boolean;

  agregarHijo: Observable<Hijo>;
  responseHijo: Hijo;

  listarHijos: Observable<ListHijosResponse>;
  responseListarHijos: ListHijosResponse;

  myForm: FormGroup;

  constructor(private fb: FormBuilder, private spinner: NgxSpinnerService, private service: ChildrenService) {
    this.SDTHijos = new Array<Hijo>();
    this.SDTHijos = JSON.parse(localStorage.getItem('hijos'));
    this.form = false;

    this.myForm = fb.group({
      nombre: [null, Validators.required],
      edad: [null, Validators.required],
      peso: [null, Validators.required]
    });
   }

  ngOnInit(): void {
  }

  cambio()  {
    this.form = true;
  }

  isPersonalDataFieldValid(field: string) {
    return !this.myForm.get(field).valid && this.myForm.get(field).touched;
  }

  agregar() {
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
    this.agregarHijo.subscribe(results => {
      this.responseHijo = results;
      if (this.responseHijo.gx_md5_hash !== '') {
        this.form = false;
        this.spinner.hide();
        this.tieneHijos();
      }
    }, error => {
      console.log('**********************' + JSON.parse(error));
      this.spinner.hide();
      this.form = false;
    });
  }

  tieneHijos(): void {
    this.spinner.show();
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
      this.listarHijos.subscribe(results => {
        this.responseListarHijos = results;
        if (this.responseListarHijos.SDTHijos.length > 0) {
          localStorage.setItem('hijos', JSON.stringify(this.responseListarHijos.SDTHijos));
          this.SDTHijos = JSON.parse(localStorage.getItem('hijos'));
          this.spinner.hide();
        }
      }, error => {
        console.log('**********************' + JSON.parse(error));
        this.spinner.hide();
      });
    }
  }

}
