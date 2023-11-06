import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArquiteturaModule } from 'src/app/arquitetura/arquitetura.module';
import { SobreComponent } from './sobre.component';

@NgModule({
  declarations: [
    SobreComponent
  ],
  imports: [
    CommonModule,
    ArquiteturaModule
  ],
  exports: [
    SobreComponent,
  ]
})
export class SobreModule { }
