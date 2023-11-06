import { PerfilComponent } from './perfil.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArquiteturaModule } from 'src/app/arquitetura/arquitetura.module';



@NgModule({
  declarations: [
    PerfilComponent
  ],
  imports: [
    CommonModule,
    ArquiteturaModule
  ],
  exports: [
    PerfilComponent
  ]
})
export class PerfilModule { }
