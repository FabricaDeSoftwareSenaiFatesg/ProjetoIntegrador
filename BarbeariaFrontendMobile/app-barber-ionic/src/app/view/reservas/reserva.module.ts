import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReservaPage } from './reserva.page';
import { ReservaPageRoutingModule } from './reserva-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReservaPageRoutingModule
  ],
  declarations: [ReservaPage]
})
export class ReservaPageModule {}
