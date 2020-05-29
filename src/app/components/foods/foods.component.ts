import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuService } from '../../services/menu.service';
import { Observable } from 'rxjs';
import { AlimentosResponse } from '../../models/alimentos-response';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlimentoRq } from '../../models/alimento-request';
import { GestionAlimentosService } from '../../services/gestion-alimentos.service';
import { AlimentoRs } from '../../models/alimento-response';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {

  listarAlimentos: Observable<Array<AlimentosResponse>>;
  responseAlimentos: Array<AlimentosResponse>;

  gestionAlimentos: Observable<AlimentoRs>;
  responsegAlimento: AlimentoRs;

  myForm: FormGroup;

  cambioPantalla: boolean;

  tAlimento: AlimentoRq;

  listTipoAlimento: Array<AlimentoRq>;

  constructor(private fb: FormBuilder, private spinner: NgxSpinnerService, private serviceMenu: MenuService,
              private serviceGAlimentos: GestionAlimentosService) {
    this.cambioPantalla = false;

    this.myForm = fb.group({
      alimento: [null, Validators.required],
      cantidad: [null, Validators.required],
      tAlimento: [null, Validators.required]
    });

    this.obtenerTipoAlimentos();

   }

  ngOnInit(): void {
    this.obtenerAlimentos();
  }

  redirect(): void {
    this.cambioPantalla = true;
  }

  volver(): void {
    this.cambioPantalla = false;
  }

  obtenerTipoAlimentos(): void {

    this.listTipoAlimento = new Array<AlimentoRq>();

    let proteina: AlimentoRq;
    proteina = {
      TipoAlimentoDescricpcion: 'Proteínas',
      TipoAlimentoId: 1
    };
    this.listTipoAlimento.push(proteina);

    let liquido: AlimentoRq;
    liquido = {
      TipoAlimentoDescricpcion: 'Líquidos',
      TipoAlimentoId: 2
    };
    this.listTipoAlimento.push(liquido);

    let energetico: AlimentoRq;
    energetico = {
      TipoAlimentoDescricpcion: 'Energéticos',
      TipoAlimentoId: 3
    };
    this.listTipoAlimento.push(energetico);

    let regulador: AlimentoRq;
    regulador = {
      TipoAlimentoDescricpcion: 'Reguladores',
      TipoAlimentoId: 4
    };
    this.listTipoAlimento.push(regulador);

  }

  obtenerAlimentos(): void {
    this.spinner.show();
    this.listarAlimentos = this.serviceMenu.listarAlimentos();
    this.listarAlimentos.subscribe(results => {
      this.responseAlimentos = results;
      this.cambioPantalla = false;
      this.spinner.hide();
    }, error => {
      console.log('**********************' + JSON.parse(error));
      this.spinner.hide();
    });
  }

  borrar(request: string): void {
    this.spinner.show();
    let borrar;
    borrar = this.serviceGAlimentos.borrar(request);
    borrar.subscribe(results => {
      this.responsegAlimento = results;
      this.spinner.hide();
      this.obtenerAlimentos();
    }, error => {
      console.log('**********************' + JSON.stringify(error));
      this.spinner.hide();
    });

  }

  agregar(): void {
    this.spinner.show();
    let request: AlimentoRq;
    this.tAlimento = this.myForm.get('tAlimento').value;
    request = {
      AlimentoCantidad: this.myForm.get('cantidad').value,
      AlimentoNombre: this.myForm.get('alimento').value,
      TipoAlimentoDescricpcion: this.tAlimento.TipoAlimentoDescricpcion,
      TipoAlimentoId: this.tAlimento.TipoAlimentoId
    };
    this.gestionAlimentos = this.serviceGAlimentos.agregar(request);
    this.gestionAlimentos.subscribe(results => {
      this.responsegAlimento = results;
      this.spinner.hide();
      this.obtenerAlimentos();
    }, error => {
      console.log('**********************' + JSON.stringify(error));
      this.spinner.hide();
    });
  }

  isPersonalDataFieldValid(field: string) {
    return !this.myForm.get(field).valid && this.myForm.get(field).touched;
  }
}
