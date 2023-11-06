import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BaseComponent} from 'src/app/arquitetura/component/base.component';
import {Reserva} from 'src/app/arquitetura/modelo/reserva.model';
import {ReservaService} from '../reserva.service';
import {ActivatedRoute, Router} from '@angular/router';
import { MessageService } from 'primeng/api';
import {PessoaService} from "../../pessoa/pessoa.service";
import {ServicoService} from "../../servico/servico.service";
import {StatusReservaEnum} from "../../../arquitetura/modelo/status-reserva.enum";

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css'],
  providers: [MessageService]
})
export class ReservaCadastroComponent extends BaseComponent<Reserva> implements OnInit{

  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
    protected override router: Router,
    protected override activatedRoute: ActivatedRoute,
    protected override service: ReservaService,
    protected pessoaService: PessoaService,
    protected servicoService: ServicoService,
    protected override messageService: MessageService) {

    super(changeDetectorRef, router, activatedRoute, service, messageService);

    this.ngOnInit();
  }

  data: Date = new Date();

  servicos: any = [];
  servicosSelecionados: any = [];

  profissionais: any = [];
  profissionalSelecionado: any = [];

  horarios: string[] = [];
  horarioSelecionado: string = '';

  informacoes: any = {
    servicos: '-',
    profissional: '-',
    dataHora: '-',
    total: 0
  };
  desabilitarHorarios = true;

  override ngOnInit(): void {

    this.informacoes.total = this.informacoes.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    this.newEntidade();
    this.consultarServicos();
    this.consultarProfissionais();
    this.consultarUsuarioLogado();
  }

  protected override newEntidade(): Reserva {
    return new Reserva();
  }

  consultarHorarios() {
    let pesquisaHorarios = {
      servicos: this.servicosSelecionados,
      profissional: this.profissionalSelecionado,
      data: this.data
    };
    this.service.consultarHorarios(pesquisaHorarios).subscribe(response => {
      this.horarios = response.entity;
    });
    this.desabilitarHorarios = false;
  }

  consultarProfissionais() {
    this.pessoaService.getFuncionarios().subscribe(response => {
      this.profissionais = response;
    });
  }

  consultarServicos() {
    this.servicoService.listar().subscribe(response => {
      this.servicos = response;
    })
  }

  consultarUsuarioLogado() {
    this.service.getUsuarioLogado().subscribe(response => {
      this.usuarioLogado = response;
    });
  }

  salvarReserva() {
    let reserva = {
      cliente: this.usuarioLogado.pessoa,
      funcionario: this.profissionalSelecionado,
      servicos: this.servicosSelecionados,
      dataInicial: this.getDataInicial(),
      dataFim: this.getDataFim(this.getDataInicial()),
      statusReserva: StatusReservaEnum.RESERVADO,
    }
    this.service.salvarReserva(reserva).subscribe();
  }

  getDataInicial() {
    let dataInicial = this.data;
    console.log(dataInicial);
    let horaInicial = Number(this.horarioSelecionado.substring(0, 2));
    let minutoInicial = Number(this.horarioSelecionado.substring(3, 5));
    dataInicial.setHours(horaInicial, minutoInicial, 0, 0);
    return dataInicial;
  }

  getDataFim(dataInicial: Date) {
    let tempoTotalServicos = this.getTempoTotalServicos();
    let qntHorariosNecessarios = Math.ceil(tempoTotalServicos/30);
    let horasFinais = Math.floor(qntHorariosNecessarios * 30 / 60);
    let minutosFinais = qntHorariosNecessarios * 30 % 60;
    let dataFinal = new Date();
    dataFinal.setHours(dataInicial.getHours() + horasFinais, dataInicial.getMinutes() + minutosFinais, 0, 0);
    return dataFinal;
  }

  getTempoTotalServicos() {
    let tempoTotalServicos = 0;
    this.servicosSelecionados.forEach((servico: { tempo: number; }) => {
      tempoTotalServicos += servico.tempo;
    });
    return tempoTotalServicos;
  }

  onChangeServicos() {
    this.setServicosNasInformacoes();
  }

  setServicosNasInformacoes() {
    let servicosSelecionadosString = '-';
    let total = 0;
    this.servicosSelecionados.forEach((servico: { descricao: string; valor: number; }) => {
      servicosSelecionadosString += servico.descricao + ', ';
      total += servico.valor;
    })
    servicosSelecionadosString = servicosSelecionadosString.substring(1, servicosSelecionadosString.length-2);
    this.informacoes.servicos = servicosSelecionadosString;
    this.informacoes.total = total.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  }

  onChangeProfissional() {
    this.informacoes.profissional = this.profissionalSelecionado.nome;
  }

  onChangeDataHora() {
    let dataInicial =  this.getDataInicial();
    let dataFim = this.getDataFim(dataInicial);

    const formatador = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const partesData = formatador.formatToParts(dataInicial);
    const data = partesData.map(part => part.value).join('');

    const horaInicial = dataInicial.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const horaFinal = dataFim.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    this.informacoes.dataHora = data + " - " + horaInicial + " às " + horaFinal;
  }

  redirecionarParaRota(rota: string): void {
    this.router.navigateByUrl(rota);
  }

  confirmarReserva() {
    this.salvarReserva();
    this.adicionarMensagemSucesso("Agendamento realizado com sucesso!");
    this.redirecionarParaRota('');
  }
}
