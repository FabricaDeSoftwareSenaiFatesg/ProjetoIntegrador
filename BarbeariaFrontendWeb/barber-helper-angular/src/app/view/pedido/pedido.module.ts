import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArquiteturaModule } from 'src/app/arquitetura/arquitetura.module';
import { PedidoComponent } from './pedido.component';

@NgModule({
  declarations: [
    PedidoComponent
  ],
  imports: [
    CommonModule,
    ArquiteturaModule,
  ],
  exports: [
    PedidoComponent
  ]
})
export class PedidoModule { }
