import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendamentoPageRoutingModule } from './agendamento-routing.module';

import { AgendamentoPage } from './agendamento.page';
import {CarouselModule} from "primeng/carousel";
import {ServicoService} from "../../../../arquitetura/services/servico.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AgendamentoPageRoutingModule,
        CarouselModule
    ],
  declarations: [AgendamentoPage],
  providers: [ServicoService]
})
export class AgendamentoPageModule {}
