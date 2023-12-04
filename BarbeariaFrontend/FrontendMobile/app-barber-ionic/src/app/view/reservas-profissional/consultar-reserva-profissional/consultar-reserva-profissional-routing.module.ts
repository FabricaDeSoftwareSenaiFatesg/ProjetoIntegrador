import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultarReservaProfissionalPage } from './consultar-reserva-profissional.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultarReservaProfissionalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultarReservaProfissionalPageRoutingModule {}
