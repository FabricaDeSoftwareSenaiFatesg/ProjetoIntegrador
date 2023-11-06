import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArquiteturaModule } from 'src/app/arquitetura/arquitetura.module';
import { ProdutoComponent } from './produto.component';

@NgModule({
  declarations: [
    ProdutoComponent
  ],
  imports: [
    CommonModule,
    ArquiteturaModule,
  ],
  exports: [
    ProdutoComponent
  ]
})
export class ProdutoModule { }
