import { Component } from '@angular/core';
import {NavController} from "@ionic/angular";
import {AgendamentoService} from "../../../arquitetura/services/agendamento.service";

@Component({
  selector: 'app-reserva',
  templateUrl: 'reserva.page.html',
  styleUrls: ['reserva.page.scss']
})
export class ReservaPage {

  agendamentos!: any[];

  constructor(
    private navigation: NavController,
    private agendamentoService: AgendamentoService
  ) {}

  async ngOnInit() {
    await this.consultarReservasPorCliente();
  }

  redirecionarAgendamento() {
    this.navigation.navigateRoot('/tabs/reserva/agendamento');
  }

  consultarReservasPorCliente() {
    this.agendamentoService.listarReservasPorCliente(4).subscribe(response => {
      this.agendamentos = response;
    });
  }

  consultarReserva(id: number) {
    this.navigation.navigateRoot('/tabs/reserva/consultar-reserva/' + id)
  }
}
