import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReservaPage} from "./reserva.page";
import {TabsPage} from "../tabs/tabs.page";

const routes: Routes = [
  {
    path: '',
    component: ReservaPage
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
