import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  adminFlag: boolean;

  constructor(private router: Router) {
    if (localStorage.getItem('flag') === '0') {
      this.adminFlag = true;
    } else {
      this.adminFlag = false;
    }
  }

  ngOnInit(): void {
  }

  closeSesion() {
    if (!this.adminFlag) {
      localStorage.removeItem('usertoken');
      localStorage.removeItem('hijos');
    }
    localStorage.removeItem('flag');
    this.router.navigate(['inicio']);
  }

  administrar() {
    this.router.navigate(['inicio/datosPersonales']);
  }

  combos() {
    this.router.navigate(['inicio/principal']);
  }

  listarpedidos() {
    this.router.navigate(['inicio/gestion']);
  }

  adminMenus() {
    this.router.navigate(['inicio/gMenu']);
  }

  adminFood() {
    this.router.navigate(['inicio/gAlimentos']);
  }

}
