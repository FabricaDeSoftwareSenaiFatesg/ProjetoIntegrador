import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { LoginComponent } from './view/login/login.component';
import { PessoaRoutes } from './view/pessoa/pessoa-routes';
import { UsuarioRoutes } from './view/usuario/usuario-routes';
import { ProdutoComponent } from './view/produto/produto.component';
import { LojaComponent } from './view/loja/loja.component';
import {ReservaRoutes} from "./view/reserva/reserva-routes";
import {SobreComponent} from "./view/sobre/sobre.component";
import {AuthGuardService} from "./auth-guard.service";
import { PerfilComponent } from './view/perfil/perfil.component';
import {ServicoComponent} from "./view/servico/servico.component";
import {ServicosComponent} from "./view/servicos/servicos.component";
import {DashboardComponent} from "./view/dashboard/dashboard.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'pessoa', children: PessoaRoutes },
  { path: 'reserva', children: ReservaRoutes, canActivate: [AuthGuardService]},
  { path: 'usuario', children: UsuarioRoutes },
  { path: 'produto', component: ProdutoComponent, canActivate: [AuthGuardService]},
  { path: 'servico', component: ServicoComponent, canActivate: [AuthGuardService]},
  { path: 'servicos', component: ServicosComponent},
  { path: 'loja', component: LojaComponent, canActivate: [AuthGuardService]},
  { path: 'sobre', component: SobreComponent},
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuardService]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
