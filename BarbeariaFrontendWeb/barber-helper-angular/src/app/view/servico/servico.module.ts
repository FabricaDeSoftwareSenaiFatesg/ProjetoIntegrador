import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArquiteturaModule } from 'src/app/arquitetura/arquitetura.module';
import { ServicoComponent } from './servico.component';

@NgModule({
  declarations: [
    ServicoComponent
  ],
  imports: [
    CommonModule,
    ArquiteturaModule
  ],
  exports: [
    ServicoComponent
  ]
})
export class ServicoModule { }
