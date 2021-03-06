import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { InfoUserComponent } from './components/info-user/info-user.component';
import { AdminComponent } from './components/admin/admin.component';
import { MenuManageComponent } from './components/menu-manage/menu-manage.component';
import { FoodsComponent } from './components/foods/foods.component';
import { IdentifierComponent } from './components/identifier/identifier.component';
import { ChangepassComponent } from './components/changepass/changepass.component';

const routes: Routes = [
  { path: 'inicio', component: LoginComponent },
  { path: 'inicio/registro', component: CreateAccountComponent },
  { path: 'inicio/identificate', component: IdentifierComponent },
  { path: 'inicio/Actualizar', component: ChangepassComponent },
  { path: 'inicio/principal', component: MainComponent },
  { path: 'inicio/datosPersonales', component: InfoUserComponent },
  { path: 'inicio/gestion', component: AdminComponent },
  { path: 'inicio/gMenu', component: MenuManageComponent },
  { path: 'inicio/gAlimentos', component: FoodsComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
