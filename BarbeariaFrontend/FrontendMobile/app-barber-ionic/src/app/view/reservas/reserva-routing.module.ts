import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReservaPage} from "./reserva.page";

const routes: Routes = [
  {
    path: '',
    component: ReservaPage
  },
  {
    path: 'agendamento',
    loadChildren: () => import('./agendamento/agendamento.module').then( m => m.AgendamentoPageModule)
  },
  {
    path: 'consultar-reserva/:id',
    loadChildren: () => import('./consultar-reserva/consultar-reserva.module').then( m => m.ConsultarReservaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservaPageRoutingModule {}
