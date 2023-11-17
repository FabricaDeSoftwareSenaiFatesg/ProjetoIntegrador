import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendamentoPageRoutingModule } from './agendamento-routing.module';

import { AgendamentoPage } from './agendamento.page';
import {CarouselModule} from "primeng/carousel";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AgendamentoPageRoutingModule,
        CarouselModule
    ],
  declarations: [AgendamentoPage]
})
export class AgendamentoPageModule {}
