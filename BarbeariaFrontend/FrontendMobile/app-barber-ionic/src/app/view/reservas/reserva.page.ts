import { Component } from '@angular/core';
import {AgendamentoPage} from "./agendamento/agendamento.page";
import {ReservaPerfil} from "../../../arquitetura/modelo/reserva-perfil";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-reserva',
  templateUrl: 'reserva.page.html',
  styleUrls: ['reserva.page.scss']
})
export class ReservaPage {

  listaAgendamentos: any[] = [];

  constructor(private navigation: NavController) {}

  reservaComponente = ReservaPage;
  agendamentoComponente = AgendamentoPage;

  ngOnInit() {

  }

  reservar() {

  }

  redirecionarAgendamento() {
    this.navigation.navigateRoot('/tabs/reserva/agendamento');
  }

}

class Reserva {

  data: Date = new Date();
  valor: number = 0;
  servico: string = "";
  horaInicio: string = "";
  horaFim: string = "";
  profissional: string = "";

}
