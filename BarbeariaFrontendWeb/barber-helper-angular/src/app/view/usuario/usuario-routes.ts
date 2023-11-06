import { Route } from "@angular/router";
import { UsuarioCadastroComponent } from "./usuario-cadastro/usuario-cadastro.component";
import { UsuarioListagemComponent } from "./usuario-listagem/usuario-listagem.component";

export const UsuarioRoutes:Route[] = [
  { path: '', component: UsuarioListagemComponent },
  { path: 'novo', component: UsuarioCadastroComponent }

]
