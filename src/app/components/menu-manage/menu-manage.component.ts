import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuService } from '../../services/menu.service';
import { Observable } from 'rxjs';
import { Combo } from '../../models/combo-response';
import { AlimentosResponse } from '../../models/alimentos-response';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GestionCombosService } from '../../services/gestion-combos.service';
import { ComboRq } from '../../models/combo-request';
import { AlimentoCombo } from '../../models/alimento-combo';

@Component({
  selector: 'app-menu-manage',
  templateUrl: './menu-manage.component.html',
  styleUrls: ['./menu-manage.component.css']
})
export class MenuManageComponent implements OnInit {

  listarCombos: Observable<Array<Combo>>;
  responseListarCombos: Array<Combo>;

  listarAlimentos: Observable<Array<AlimentosResponse>>;
  responseAlimentos: Array<AlimentosResponse>;

  llamarCombos: Observable<Combo>;
  responseCombo: Combo;

  listProteinas: Array<any>;
  listLiquidos: Array<any>;
  listEnergeticos: Array<any>;
  listReguladores: Array<any>;

  selectListP: AlimentosResponse;
  selectListL: AlimentosResponse;
  selectListE: AlimentosResponse;
  selectListR: AlimentosResponse;

  myForm: FormGroup;

  cambioPantalla: boolean;

  constructor(private fb: FormBuilder, private spinner: NgxSpinnerService, private serviceMenu: MenuService,
              private serviceCombo: GestionCombosService) {
    this.obtenerCombos();
    this.obtenerAlimentos();

    this.listProteinas = new Array<any>();
    this.listLiquidos = new Array<any>();
    this.listEnergeticos = new Array<any>();
    this.listReguladores = new Array<any>();

    this.myForm = fb.group({
      nombre: [null, Validators.required],
      selectListP: [null, Validators.required],
      selectListL: [null, Validators.required],
      selectListE: [null, Validators.required],
      selectListR: [null, Validators.required]
    });

   }

  ngOnInit(): void {
  }

  redirect(): void {
    this.spinner.show();
    this.cambioPantalla = true;

    this.listProteinas = new Array<any>();
    this.listLiquidos = new Array<any>();
    this.listEnergeticos = new Array<any>();
    this.listReguladores = new Array<any>();

    this.responseAlimentos.forEach(row => {
      if (row.TipoAlimentoId === 1) {

        this.listProteinas.push(row);

      } else if (row.TipoAlimentoId === 2) {

        this.listLiquidos.push(row);

      } else if (row.TipoAlimentoId === 3) {

        this.listEnergeticos.push(row);

      } else if (row.TipoAlimentoId === 4) {

        this.listReguladores.push(row);

      }
    });
    this.spinner.hide();

  }

  volver(): void {
    this.cambioPantalla = false;
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

  obtenerCombos(): void {
    this.spinner.show();
    this.listarCombos = this.serviceMenu.listarMenu();
    this.listarCombos.subscribe(results => {
      this.responseListarCombos = results;
      this.cambioPantalla = false;
      this.spinner.hide();
    }, error => {
      console.log('**********************' + JSON.parse(error));
      this.spinner.hide();
    });
  }

  agregar(): void {
    this.spinner.show();
    this.selectListP = this.myForm.get('selectListP').value;
    this.selectListL = this.myForm.get('selectListL').value;
    this.selectListE = this.myForm.get('selectListE').value;
    this.selectListR = this.myForm.get('selectListR').value;

    let alimentos: Array<AlimentoCombo>;
    alimentos = Array<AlimentoCombo>();
    let proteina: AlimentoCombo;
    proteina = {
      AlimentoId: this.selectListP.AlimentoId,
      AlimentoNombre:  this.selectListP.AlimentoNombre
    };
    alimentos.push(proteina);

    let liquido: AlimentoCombo;
    liquido = {
      AlimentoId: this.selectListL.AlimentoId,
      AlimentoNombre:  this.selectListL.AlimentoNombre
    };
    alimentos.push(liquido);

    let energetico: AlimentoCombo;
    energetico = {
      AlimentoId: this.selectListE.AlimentoId,
      AlimentoNombre:  this.selectListE.AlimentoNombre
    };
    alimentos.push(energetico);

    let regulador: AlimentoCombo;
    regulador = {
      AlimentoId: this.selectListR.AlimentoId,
      AlimentoNombre:  this.selectListR.AlimentoNombre
    };
    alimentos.push(regulador);

    let request: ComboRq;
    request = {
      Alimentos: alimentos,
      ComboNombre: this.myForm.get('nombre').value
    };

    this.llamarCombos = this.serviceCombo.agregar(request);
    this.llamarCombos.subscribe(results => {
      this.responseCombo = results;
      this.obtenerCombos();
      this.spinner.hide();
    }, error => {
      console.log('**********************' + JSON.stringify(error));
      this.spinner.hide();
    });

  }

  isPersonalDataFieldValid(field: string) {
    return !this.myForm.get(field).valid && this.myForm.get(field).touched;
  }

}
