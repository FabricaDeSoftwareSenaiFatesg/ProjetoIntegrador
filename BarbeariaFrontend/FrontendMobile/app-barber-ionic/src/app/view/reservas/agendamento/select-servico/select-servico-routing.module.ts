import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectServicoPage } from './select-servico.page';

const routes: Routes = [
  {
    path: '',
    component: SelectServicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectServicoPageRoutingModule {}
