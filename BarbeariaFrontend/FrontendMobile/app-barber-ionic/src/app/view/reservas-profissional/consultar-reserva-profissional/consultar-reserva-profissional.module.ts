import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultarReservaProfissionalPageRoutingModule } from './consultar-reserva-profissional-routing.module';

import { ConsultarReservaProfissionalPage } from './consultar-reserva-profissional.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultarReservaProfissionalPageRoutingModule
  ],
  declarations: [ConsultarReservaProfissionalPage]
})
export class ConsultarReservaProfissionalPageModule {}
