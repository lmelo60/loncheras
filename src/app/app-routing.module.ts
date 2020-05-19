import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { InfoUserComponent } from './components/info-user/info-user.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { path: 'inicio', component: LoginComponent },
  { path: 'inicio/registro', component: CreateAccountComponent },
  { path: 'inicio/principal', component: MainComponent },
  { path: 'inicio/datosPersonales', component: InfoUserComponent },
  { path: 'inicio/gestion', component: AdminComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
