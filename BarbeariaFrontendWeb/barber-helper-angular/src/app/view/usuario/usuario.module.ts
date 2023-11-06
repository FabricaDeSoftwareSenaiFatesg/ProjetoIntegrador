import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArquiteturaModule } from 'src/app/arquitetura/arquitetura.module';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { UsuarioListagemComponent } from './usuario-listagem/usuario-listagem.component';
import {ToggleButtonModule} from "primeng/togglebutton";

@NgModule({
  declarations: [
    UsuarioListagemComponent,
    UsuarioCadastroComponent
  ],
  imports: [
    CommonModule,
    ArquiteturaModule,
    ToggleButtonModule
  ],
  exports: [
    UsuarioListagemComponent,
    UsuarioCadastroComponent
  ]
})
export class UsuarioModule { }
