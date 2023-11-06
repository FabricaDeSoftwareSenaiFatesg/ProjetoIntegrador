import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoaModule } from './pessoa/pessoa.module';
import { ReservaModule } from './reserva/reserva.module';
import { ServicoModule } from './servico/servico.module';
import { HomeModule } from './home/home.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ProdutoModule } from './produto/produto.module';
import { LojaModule } from './loja/loja.module';
import { MenuModule } from './menu/menu.module';
import { PedidoModule } from './pedido/pedido.module';
import { PerfilModule } from './perfil/perfil.module';
import {ServicosModule} from "./servicos/servicos.module";
import {DashboardModule} from "./dashboard/dashboard.module";

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PessoaModule,
    ReservaModule,
    ServicoModule,
    ServicosModule,
    HomeModule,
    UsuarioModule,
    ProdutoModule,
    LojaModule,
    MenuModule,
    PedidoModule,
    PerfilModule,
    DashboardModule
  ]
})
export class ViewModule { }
