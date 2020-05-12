import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { ListHijosResponse } from '../../models/listHijos-response';
import { ChildrenService } from '../../services/children.service';
import { ListHijosRequest } from 'src/app/models/listHijos-request';
import { Hijo } from '../../models/hijo';
import { Combo } from '../../models/combo-response';
import { MenuService } from '../../services/menu.service';
import { AlimentoCombo } from '../../models/alimento-combo';
import { AlimentosResponse } from '../../models/alimentos-response';
import { SolicitudResponse } from '../../models/solicitud-response';
import { SolicitudRequest } from 'src/app/models/solicitud-request';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  hijos: boolean;
  menu: boolean;
  noHijo: boolean;

  myForm: FormGroup;
  menuForm: FormGroup;

  listarHijos: Observable<ListHijosResponse>;
  responseListarHijos: ListHijosResponse;

  agregarHijo: Observable<Hijo>;
  responseHijo: Hijo;

  listarCombos: Observable<Array<Combo>>;
  responseListarCombos: Array<Combo>;

  listarAlimentos: Observable<Array<AlimentosResponse>>;
  responseAlimentos: Array<AlimentosResponse>;

  crearSolicitud: Observable<SolicitudResponse>;
  responseSolicitud: SolicitudResponse;

  Alimentos: Array<AlimentoCombo>;

  listProteinas: Array<any>;
  listLiquidos: Array<any>;
  listEnergeticos: Array<any>;
  listReguladores: Array<any>;

  selectListP: AlimentosResponse;
  selectListL: AlimentosResponse;
  selectListE: AlimentosResponse;
  selectListR: AlimentosResponse;

  constructor(private fb: FormBuilder, private spinner: NgxSpinnerService, private service: ChildrenService,
              private serviceMenu: MenuService) {
    console.log('constructor exitoso');

    this.menu = false;
    this.noHijo = false;

    this.listProteinas = new Array<any>();
    this.listLiquidos = new Array<any>();
    this.listEnergeticos = new Array<any>();
    this.listReguladores = new Array<any>();

    this.myForm = fb.group({
      nombre: [null, Validators.required],
      edad: [null, Validators.required],
      peso: [null, Validators.required]
    });

    this.menuForm = fb.group({
      selectListP: [null, Validators.required],
      selectListL: [null, Validators.required],
      selectListE: [null, Validators.required],
      selectListR: [null, Validators.required],
      selectHijo: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    console.log('ngOnInit exitoso');
    this.spinner.show();
    this.tieneHijos();
  }

  tieneHijos(): void {
    this.spinner.show();
    this.hijos = false;
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
          this.spinner.hide();
          this.obtenerCombos();
          this.hijos = true;
        } else {
          this.hijos = false;
          this.spinner.hide();
        }
      }, error => {
        console.log('**********************' + JSON.parse(error));
        this.spinner.hide();
        this.hijos = false;
      });
    }
  }

  obtenerCombos(): void {
    this.spinner.show();
    this.listarCombos = this.serviceMenu.listarMenu();
    this.listarCombos.subscribe(results => {
      this.responseListarCombos = results;
      this.spinner.hide();
      this.obtenerAlimentos();
    }, error => {
      console.log('**********************' + JSON.parse(error));
      this.spinner.hide();
    });
  }

  obtenerAlimentos(): void {
    this.spinner.show();
    this.listarAlimentos = this.serviceMenu.listarAlimentos();
    this.listarAlimentos.subscribe(results => {
      this.responseAlimentos = results;
      this.spinner.hide();
    }, error => {
      console.log('**********************' + JSON.parse(error));
      this.spinner.hide();
    });
  }

  isPersonalDataFieldValid(field: string) {
    return !this.myForm.get(field).valid && this.myForm.get(field).touched;
  }

  DataFieldValid(field: string) {
    return !this.menuForm.get(field).valid && this.menuForm.get(field).touched && (this.menuForm.get(field).value !== 'undefined');
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
    this.agregarHijo.subscribe(results => {
      this.responseHijo = results;
      if (this.responseHijo.gx_md5_hash !== '') {
        this.hijos = true;
        this.tieneHijos();
        this.spinner.hide();
      }
    }, error => {
      console.log('**********************' + JSON.parse(error));
      this.spinner.hide();
      this.hijos = false;
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
    this.agregarHijo.subscribe(results => {
      this.responseHijo = results;
      if (this.responseHijo.gx_md5_hash !== '') {
        this.myForm.get('nombre').reset();
        this.myForm.get('edad').reset();
        this.myForm.get('peso').reset();
        this.spinner.hide();
      }
    }, error => {
      console.log('**********************' + JSON.parse(error));
      this.spinner.hide();
    });
  }

  solicitar(comboId: number) {
    this.spinner.show();
    this.menu = true;

    this.listProteinas = new Array<any>();
    this.listLiquidos = new Array<any>();
    this.listEnergeticos = new Array<any>();
    this.listReguladores = new Array<any>();

    this.menuForm.patchValue({selectHijo: '0'});

    this.responseListarCombos.forEach(row => {
      if (row.ComboId === comboId) {
        this.Alimentos = row.Alimentos;
      }
    });

    this.responseAlimentos.forEach(row => {
      if (row.TipoAlimentoId === 1) {

        this.listProteinas.push(row);
        this.Alimentos.forEach(aux => {
          if (aux.AlimentoId === row.AlimentoId) {
            this.menuForm.patchValue({selectListP: row});
          }
        });

      } else if (row.TipoAlimentoId === 2) {

        this.listLiquidos.push(row);
        this.Alimentos.forEach(aux => {
          if (aux.AlimentoId === row.AlimentoId) {
            this.menuForm.patchValue({selectListL: row});
          }
        });

      } else if (row.TipoAlimentoId === 3) {

        this.listEnergeticos.push(row);
        this.Alimentos.forEach(aux => {
          if (aux.AlimentoId === row.AlimentoId) {
            this.menuForm.patchValue({selectListE: row});
          }
        });

      } else if (row.TipoAlimentoId === 4) {

        this.listReguladores.push(row);
        this.Alimentos.forEach(aux => {
          if (aux.AlimentoId === row.AlimentoId) {
            this.menuForm.patchValue({selectListR: row});
          }
        });

      }
    });
    this.spinner.hide();
  }

  get selectHijo() {
    return this.menuForm.get('selectHijo');
  }

  changeHijo() {
      this.noHijo = false;
  }

  declinar() {
    this.menu = false;
  }

  pedir() {
    this.spinner.show();
    this.selectListP = this.menuForm.get('selectListP').value;
    this.selectListL = this.menuForm.get('selectListL').value;
    this.selectListE = this.menuForm.get('selectListE').value;
    this.selectListR = this.menuForm.get('selectListR').value;
    let selectHijo: Hijo = this.selectHijo.value;

    if ( selectHijo.HijoNombre === null || selectHijo.HijoNombre === undefined ) {

      this.noHijo = true;
      this.spinner.hide();

    } else {

      let arrayAlimentos: Array<AlimentoCombo>;
      arrayAlimentos = new Array<AlimentoCombo>();
      arrayAlimentos.push({AlimentoId: this.selectListP.AlimentoId});
      arrayAlimentos.push({AlimentoId: this.selectListL.AlimentoId});
      arrayAlimentos.push({AlimentoId: this.selectListE.AlimentoId});
      arrayAlimentos.push({AlimentoId: this.selectListR.AlimentoId});

      let solicitudRq: SolicitudRequest;
      solicitudRq = {
        HijoId: selectHijo.HijoId,
        TipoAlimento: arrayAlimentos
      };

      this.crearSolicitud = this.serviceMenu.crearSolicitud(solicitudRq);
      this.crearSolicitud.subscribe(results => {
        this.responseSolicitud = results;
        if (this.responseSolicitud.gx_md5_hash !== '') {
          this.spinner.hide();
          console.log('Solicitud creada perfectamente');
          this.menu = false;
        } else {
          this.spinner.hide();
          console.log('No fue posible crear la Solicitud');
        }
      },  error => {
        console.log('**********Error Solicitud************' + JSON.parse(error));
        this.spinner.hide();
      });

    }
  }

}
