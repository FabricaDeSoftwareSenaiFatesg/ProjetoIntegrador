import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservasProfissionalPage } from './reservas-profissional.page';

const routes: Routes = [
  {
    path: '',
    component: ReservasProfissionalPage
  },
  {
    path: 'consultar-reserva-profissional/:id',
    loadChildren: () => import('./consultar-reserva-profissional/consultar-reserva-profissional.module').then( m => m.ConsultarReservaProfissionalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservasProfissionalPageRoutingModule {}
