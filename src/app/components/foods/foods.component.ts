import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuService } from '../../services/menu.service';
import { Observable } from 'rxjs';
import { AlimentosResponse } from '../../models/alimentos-response';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {

  listarAlimentos: Observable<Array<AlimentosResponse>>;
  responseAlimentos: Array<AlimentosResponse>;

  constructor(private spinner: NgxSpinnerService, private serviceMenu: MenuService) { }

  ngOnInit(): void {
    this.obtenerAlimentos();
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
}
