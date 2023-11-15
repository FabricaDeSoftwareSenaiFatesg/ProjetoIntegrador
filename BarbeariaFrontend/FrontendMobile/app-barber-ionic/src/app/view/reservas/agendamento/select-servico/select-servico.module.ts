import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectServicoPageRoutingModule } from './select-servico-routing.module';

import { SelectServicoPage } from './select-servico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectServicoPageRoutingModule
  ],
  declarations: [SelectServicoPage]
})
export class SelectServicoPageModule {}
