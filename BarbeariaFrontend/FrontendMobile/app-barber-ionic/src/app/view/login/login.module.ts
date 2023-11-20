import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPage } from './login.page';

import { LoginPageRoutingModule } from './login-routing.module';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    LoginPageRoutingModule,
    CarouselModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
