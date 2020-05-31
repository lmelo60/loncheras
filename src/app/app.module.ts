import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxMaskModule, IConfig } from 'ngx-mask';

// Rutas
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { MainComponent } from './components/main/main.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InfoUserComponent } from './components/info-user/info-user.component';
import { AdminComponent } from './components/admin/admin.component';
import { FoodsComponent } from './components/foods/foods.component';
import { MenuManageComponent } from './components/menu-manage/menu-manage.component';
import { IdentifierComponent } from './components/identifier/identifier.component';
import { ChangepassComponent } from './components/changepass/changepass.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    MainComponent,
    NavbarComponent,
    InfoUserComponent,
    AdminComponent,
    FoodsComponent,
    MenuManageComponent,
    IdentifierComponent,
    ChangepassComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxMaskModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
