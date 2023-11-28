import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultarReservaPage } from './consultar-reserva.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultarReservaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultarReservaPageRoutingModule {}
