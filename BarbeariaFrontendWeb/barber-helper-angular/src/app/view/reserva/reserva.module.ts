import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArquiteturaModule } from 'src/app/arquitetura/arquitetura.module';
import { ReservaCadastroComponent } from './reserva-cadastro/reserva.component';
import {MultiSelectModule} from "primeng/multiselect";
import {ReservaListagemComponent} from "./reserva-listagem/reserva-listagem.component";

@NgModule({
  declarations: [
    ReservaCadastroComponent,
    ReservaListagemComponent
  ],
    imports: [
        CommonModule,
        ArquiteturaModule,
        MultiSelectModule
    ],
  exports: [
    ReservaCadastroComponent,
    ReservaListagemComponent
  ]
})
export class ReservaModule { }
