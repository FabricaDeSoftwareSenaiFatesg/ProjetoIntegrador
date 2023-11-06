import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoaListagemComponent } from './pessoa-listagem/pessoa-listagem.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { ArquiteturaModule } from 'src/app/arquitetura/arquitetura.module';

@NgModule({
  declarations: [
    PessoaListagemComponent,
    PessoaCadastroComponent
  ],
  imports: [
    CommonModule,
    ArquiteturaModule
  ],
  exports: [
    PessoaListagemComponent,
    PessoaCadastroComponent
  ]
})
export class PessoaModule { }
