import {ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Pessoa} from "../../../arquitetura/modelo/pessoa.model";
import {ReservaPerfil} from "../../../arquitetura/modelo/reserva-perfil";
import {StatusReservaEnum} from "../../../arquitetura/modelo/enum/status-reserva.enum";
import {Servico} from "../../../arquitetura/modelo/servico.model";

@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss']
})
export class PerfilPage {

  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
    protected router: Router,
    protected activatedRoute: ActivatedRoute
  ) {}

  quantidadeMaximaReservas = 8;
  visualizar = true;
  pessoa: Pessoa = new Pessoa();
  reservasPerfil: ReservaPerfil[] = [];
  historico: ReservaPerfil[] = [];
  dataSelecionada = new Date;

  ngOnInit() {
    this.pessoa.nome = 'Nome da Pessoa';
    this.pessoa.telefone = '62 8888-8888';
    this.pessoa.email = 'email@gmail.com';
    this.pessoa.flagFuncionario = false;

    this.reservasPerfil = this.getListaReservas();
  }

  editar() {
    this.visualizar = !this.visualizar;
  }

  salvar() {
    console.log('chamei o salvar');
    this.visualizar = !this.visualizar;
  }

  getListaReservas(): ReservaPerfil[] {

    // ao chamar essa função, já vai consultar o backend
      // a consulta ja vai limitar a quantidade de resultados para 8

    let reservas:ReservaPerfil[] = [];

    let reservaPerfil =  new ReservaPerfil();
    let servico = new Servico;
    servico.descricao = 'Corte';
    reservaPerfil.servico = servico;
    reservaPerfil.statusReserva = StatusReservaEnum.RESERVADO;
    reservaPerfil.data = new Date();

    reservas.push(reservaPerfil);
    reservas.push(reservaPerfil);
    reservas.push(reservaPerfil);
    reservas.push(reservaPerfil);
    reservas.push(reservaPerfil);
    reservas.push(reservaPerfil);
    reservas.push(reservaPerfil);
    reservas.push(reservaPerfil);

    return reservas;
  }

  resgatarRecompensa() {
    console.log('chamou o resgatar recompensa');

    // remover lista de "FidelidadeTO" do banco de dados

    this.reservasPerfil = [];
  }

  consultarHistorico(dataSelecionada: Date) {
    console.log(dataSelecionada);
    console.log('chamei a funcao de consultar historico');
    this.historico = this.getListaReservas();
  }

}
