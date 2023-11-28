import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultarReservaPageRoutingModule } from './consultar-reserva-routing.module';

import { ConsultarReservaPage } from './consultar-reserva.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultarReservaPageRoutingModule
  ],
  declarations: [ConsultarReservaPage]
})
export class ConsultarReservaPageModule {}
