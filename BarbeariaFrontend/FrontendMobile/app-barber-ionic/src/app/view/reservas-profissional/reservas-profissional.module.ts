import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservasProfissionalPageRoutingModule } from './reservas-profissional-routing.module';

import { ReservasProfissionalPage } from './reservas-profissional.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservasProfissionalPageRoutingModule,
    FormsModule,
    FormsModule
  ],
  declarations: [ReservasProfissionalPage]
})
export class ReservasProfissionalPageModule {}
