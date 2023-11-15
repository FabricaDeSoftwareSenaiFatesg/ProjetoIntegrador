import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tabs/reserva',
    pathMatch: 'full',
  },
  {
    path: 'agendamento',
    redirectTo: '/tabs/reserva/agendamento',
    pathMatch: 'full'
  },
  {
    path: 'agendamento',
    loadChildren: () => import('./agendamento/agendamento.module').then( m => m.AgendamentoPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservaPageRoutingModule {}
