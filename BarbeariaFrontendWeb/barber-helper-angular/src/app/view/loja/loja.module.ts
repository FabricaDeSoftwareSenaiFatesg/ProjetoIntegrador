import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArquiteturaModule } from 'src/app/arquitetura/arquitetura.module';
import { LojaComponent } from './loja.component';

@NgModule({
  declarations: [
    LojaComponent
  ],
  imports: [
    CommonModule,
    ArquiteturaModule,
  ],
  exports: [
    LojaComponent
  ]
})
export class LojaModule { }
