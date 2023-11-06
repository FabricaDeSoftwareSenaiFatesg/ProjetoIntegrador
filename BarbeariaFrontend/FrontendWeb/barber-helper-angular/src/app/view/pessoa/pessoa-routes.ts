import { Route } from "@angular/router";
import { PessoaListagemComponent } from "./pessoa-listagem/pessoa-listagem.component";
import { PessoaCadastroComponent } from "./pessoa-cadastro/pessoa-cadastro.component";

export const PessoaRoutes:Route[] = [
  { path: '', component: PessoaListagemComponent },
  { path: 'novo', component: PessoaCadastroComponent }

]
