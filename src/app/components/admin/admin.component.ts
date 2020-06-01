import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../../services/pedidos.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SolicitudResponse } from '../../models/solicitud-response';
import { Observable } from 'rxjs';
import { error } from 'protractor';
import { request } from 'http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  listarPedidos: Observable<Array<SolicitudResponse>>;
  responsePedidos: Array<SolicitudResponse>;

  constructor(private spinner: NgxSpinnerService, private servicePedido: PedidosService) {
    this.listarSolicitudes();
   }

  ngOnInit(): void {
  }

  change(solicitud: SolicitudResponse): void {
    this.spinner.show();
    let request: any;
    let state = (solicitud.SolicitudEstado === true) ? false : true;
    request = {
      SolicitudId: solicitud.SolicitudId,
      Estado: state
    };
    let cambiar;
    cambiar = this.servicePedido.change(request);
    cambiar.subscribe(results => {
      this.spinner.hide();
      this.listarSolicitudes();
    }, error => {
      this.spinner.hide();
    });

  }

  listarSolicitudes(): void {
    this.spinner.show();
    this.listarPedidos = this.servicePedido.listarMenu();
    this.listarPedidos.subscribe(results => {
    this.responsePedidos = results;
    this.spinner.hide();
    }, error => {
      console.log('**********************' + JSON.parse(error));
      this.spinner.hide();
    });

  }

}
