import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {LoginComponent} from './view/login/login.component';
import {ArquiteturaModule} from './arquitetura/arquitetura.module';
import {ViewModule} from './view/view.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {HttpInterceptorAuth} from "./http-interceptor";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ArquiteturaModule,
    ViewModule,
    InputTextModule,
    ButtonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorAuth,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
