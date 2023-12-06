import { Component, OnInit } from '@angular/core';
import {ReservaModel} from "../../../../arquitetura/modelo/reserva.model";
import {Servico} from "../../../../arquitetura/modelo/servico.model";
import {ActivatedRoute} from "@angular/router";
import {MenuController, NavController} from "@ionic/angular";
import {AgendamentoService} from "../../../../arquitetura/services/agendamento.service";
import {UsuarioService} from "../../../../arquitetura/services/usuario.service";

@Component({
  selector: 'app-consultar-reserva-profissional',
  templateUrl: './consultar-reserva-profissional.page.html',
  styleUrls: ['./consultar-reserva-profissional.page.scss'],
})
export class ConsultarReservaProfissionalPage implements OnInit {

  idReserva!: number;
  reserva!: ReservaModel;
  servico: Servico = new Servico();

  dataFormatada: string = '';
  horarioInicialFormatado: string = '';
  horarioFinalFormatado: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private navigation: NavController,
    private agendamentoService: AgendamentoService,
    private usuarioService: UsuarioService,
    private menuCtrl: MenuController,
  ) { }

  ngOnInit() {
    this.idReserva = parseInt(<string>this.activatedRoute.snapshot.paramMap.get("id"));

    this.agendamentoService.consultar(this.idReserva).subscribe(response => {
      this.reserva = response;
      this.servico = this.reserva.servicos[0];
      this.formatarDataHorario();
    })
  }

  formatarDataHorario() {
    const formatoBrasileiro = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    this.dataFormatada = formatoBrasileiro.format(new Date(this.reserva.dataInicial));

    const formatoHorarioBrasileiro = new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Sao_Paulo',
    });
    this.horarioInicialFormatado = formatoHorarioBrasileiro.format(new Date(this.reserva.dataInicial));
    this.horarioFinalFormatado = formatoHorarioBrasileiro.format(new Date(this.reserva.dataFim));
  }

  cancelarReserva() {
    this.agendamentoService.cancelarReserva(this.idReserva).subscribe(() => {
      this.voltar()
    });
  }

  executarReserva() {
    this.agendamentoService.executarReserva(this.idReserva).subscribe(() => {
      this.voltar();
    });
  }

  voltar() {
    this.navigation.navigateRoot("/tabs/reserva-profissional")
  }

  deslogar() {
    this.usuarioService.logout().subscribe(() => {
      if (localStorage.getItem("ads_access_token") !== null) {
        localStorage.removeItem("ads_access_token");
      }
      this.navigation.navigateRoot("login");
    });
    this.menuCtrl.open('end');
  }
}
