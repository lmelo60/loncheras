import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuService } from '../../services/menu.service';
import { Observable } from 'rxjs';
import { Combo } from '../../models/combo-response';
import { AlimentosResponse } from '../../models/alimentos-response';

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

  constructor(private spinner: NgxSpinnerService, private serviceMenu: MenuService) {
    this.obtenerCombos();
   }

  ngOnInit(): void {
  }

  obtenerCombos(): void {
    this.spinner.show();
    this.listarCombos = this.serviceMenu.listarMenu();
    this.listarCombos.subscribe(results => {
      this.responseListarCombos = results;
      this.spinner.hide();
    }, error => {
      console.log('**********************' + JSON.parse(error));
      this.spinner.hide();
    });
  }

}
