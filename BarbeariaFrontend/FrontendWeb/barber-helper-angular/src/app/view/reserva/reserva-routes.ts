import { Route } from "@angular/router";
import { ReservaCadastroComponent } from "./reserva-cadastro/reserva.component";
import { ReservaListagemComponent } from "./reserva-listagem/reserva-listagem.component";

export const ReservaRoutes:Route[] = [

  { path: '', component: ReservaListagemComponent },
  { path: 'novo', component: ReservaCadastroComponent }

]
