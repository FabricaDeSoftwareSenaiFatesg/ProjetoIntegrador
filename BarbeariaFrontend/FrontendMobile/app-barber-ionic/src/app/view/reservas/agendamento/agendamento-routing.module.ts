import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendamentoPage } from './agendamento.page';

const routes: Routes = [
  {
    path: '',
    component: AgendamentoPage
  },
  {
    path: 'select-servico',
    loadChildren: () => import('./select-servico/select-servico.module').then(m => m.SelectServicoPageModule)
  },
  {
    path: 'select-servico',
    loadChildren: () => import('./select-servico/select-servico.module').then( m => m.SelectServicoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendamentoPageRoutingModule {}
