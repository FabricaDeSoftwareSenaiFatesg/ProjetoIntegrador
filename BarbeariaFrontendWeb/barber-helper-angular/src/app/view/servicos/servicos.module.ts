import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArquiteturaModule } from 'src/app/arquitetura/arquitetura.module';
import { ServicosComponent } from './servicos.component';

@NgModule({
  declarations: [
    ServicosComponent
  ],
  imports: [
    CommonModule,
    ArquiteturaModule,
  ],
  exports: [
    ServicosComponent
  ]
})
export class ServicosModule { }
