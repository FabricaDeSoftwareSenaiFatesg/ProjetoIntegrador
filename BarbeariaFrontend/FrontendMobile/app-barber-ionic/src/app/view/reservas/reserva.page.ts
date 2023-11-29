import {Component} from '@angular/core';
import {NavController} from "@ionic/angular";
import {AgendamentoService} from "../../../arquitetura/services/agendamento.service";
import {UsuarioService} from "../../../arquitetura/services/usuario.service";

@Component({
  selector: 'app-reserva',
  templateUrl: 'reserva.page.html',
  styleUrls: ['reserva.page.scss']
})
export class ReservaPage {

  agendamentos!: any[];

  constructor(
    private navigation: NavController,
    private agendamentoService: AgendamentoService,
    private usuarioService: UsuarioService
  ) {
  }

  async ngOnInit() {
    await this.consultarReservasPorCliente();
  }

  redirecionarAgendamento() {
    this.navigation.navigateRoot('/tabs/reserva/agendamento');
  }

  consultarReservasPorCliente() {
    this.usuarioService.getUsuarioLogado().subscribe(usuarioLogado => {
      this.agendamentoService.listarReservasPorCliente(usuarioLogado.pessoa.id).subscribe(agendamentos => {
        this.agendamentos = agendamentos;
      });
    });
  }

  consultarReserva(id: number) {
    this.navigation.navigateRoot('/tabs/reserva/consultar-reserva/' + id)
  }
}
