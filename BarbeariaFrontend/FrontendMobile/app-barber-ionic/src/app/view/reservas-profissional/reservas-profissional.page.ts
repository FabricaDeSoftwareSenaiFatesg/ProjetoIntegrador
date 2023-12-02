import {Component, OnInit} from '@angular/core';
import {AgendamentoService} from "../../../arquitetura/services/agendamento.service";
import {StatusReservaEnum} from "../../../arquitetura/modelo/enum/status-reserva.enum";
import {UsuarioService} from "../../../arquitetura/services/usuario.service";
import {FiltroReservasProfissional} from "../../../arquitetura/modelo/filtro-reservas-profissional";
import {ReservaListagemModel} from "../../../arquitetura/modelo/reserva-listagem.model";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-reservas-profissional',
  templateUrl: './reservas-profissional.page.html',
  styleUrls: ['./reservas-profissional.page.scss'],
})
export class ReservasProfissionalPage implements OnInit {

  filtro: FiltroReservasProfissional = new FiltroReservasProfissional();
  agendamentos!: ReservaListagemModel[];
  data: Date = new Date();
  status: StatusReservaEnum = StatusReservaEnum.RESERVADO;

  constructor(
    private navigation: NavController,
    private usuarioService: UsuarioService,
    private agendamentoService: AgendamentoService
  ) { }

  ngOnInit() {
    this.consultarReservas();
  }

  consultarReservas() {
    this.usuarioService.getUsuarioLogado().subscribe(usuarioLogado => {
      this.filtro.profissional = usuarioLogado.pessoa;
      if (typeof this.data === "string") this.data = new Date(`${this.data}T00:00:00`)
      this.filtro.data = this.data;
      this.filtro.status = this.status;

      this.agendamentoService.listarReservasPorProfissional(this.filtro).subscribe(agendamentos => {
        this.agendamentos = agendamentos;
      });
    });
  }

  consultarReserva(id: number) {
    this.navigation.navigateRoot('/tabs/reserva-profissional/consultar-reserva-profissional/' + id)
  }
}
