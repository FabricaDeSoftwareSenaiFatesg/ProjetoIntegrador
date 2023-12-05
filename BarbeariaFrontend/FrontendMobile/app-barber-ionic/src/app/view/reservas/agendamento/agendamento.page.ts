import {Component, OnInit, ViewChild} from '@angular/core';
import {IonModal, NavController, MenuController} from "@ionic/angular";
import {Servico} from "../../../../arquitetura/modelo/servico.model";
import {Pessoa} from "../../../../arquitetura/modelo/pessoa.model";
import {FiltroHorarios} from "../../../../arquitetura/modelo/filtro-horarios.model";
import {ServicoService} from "../../../../arquitetura/services/servico.service";
import {PessoaService} from "../../../../arquitetura/services/pessoa.service";
import {AgendamentoService} from "../../../../arquitetura/services/agendamento.service";
import {ReservaModel} from "../../../../arquitetura/modelo/reserva.model";
import {UsuarioModel} from "../../../../arquitetura/modelo/usuario.model";
import {UsuarioService} from "../../../../arquitetura/services/usuario.service";
import { Imagem } from 'src/arquitetura/modelo/imagem.model';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.page.html',
  styleUrls: ['./agendamento.page.scss'],
})
export class AgendamentoPage implements OnInit {
  @ViewChild('modalProfissional', { static: true }) modalProfissional!: IonModal;
  @ViewChild('modalData', { static: true }) modalData!: IonModal;
  @ViewChild('modalServicos', { static: true }) modalServicos!: IonModal;
  @ViewChild('modalResumo', { static: true }) modalResumo!: IonModal;

  constructor(
    private menuCtrl: MenuController,
    private navigation: NavController,
    private servicoService: ServicoService,
    private pessoaService: PessoaService,
    private agendamentoService: AgendamentoService,
    private usuarioService: UsuarioService
  ) { }

  usuarioLogado!: UsuarioModel;
  filtroHorarios: FiltroHorarios = new FiltroHorarios();

  dataSelecionada?: Date;
  dataText?: string = 'Data';

  profissionais: Pessoa[] = [];
  profissionalText: string = 'Profissional';

  servicos: Servico[] = [];
  servicosFiltrados: Servico[] = [];
  servicosText: string = 'Serviços';

  horarios: string[] = [];
  reserva: ReservaModel = new ReservaModel();

  ngOnInit() {
    this.consultarUsuarioLogado();
    this.inicializarServicos();
    this.inicializarProfissionais();
  }

  consultarUsuarioLogado() {
    this.usuarioService.getUsuarioLogado().subscribe(response => {
      this.usuarioLogado = response;
    });
  }

  inicializarServicos() {
    this.servicoService.listarDTO().subscribe(response => {
      this.servicos = response;
      this.servicosFiltrados = [...this.servicos];
    });
  }

  inicializarProfissionais() {
    this.pessoaService.listarProfissionais().subscribe(response => {
      this.profissionais = response;
    });
  }

  selecionarServico(servico: Servico) {
    this.servicosText = servico.descricao;
    this.filtroHorarios.servicos.push(servico);
    this.modalServicos.dismiss();
  }

  getDescricaoServico(servico: Servico) {
    return servico?.descricao;
  }

  pesquisarServico(ev: any) {
    this.filterList(ev.target.value);
  }

  filterList(query: string | undefined) {
    if (query === undefined) {
      this.servicosFiltrados = [...this.servicos];
    } else {
      this.servicosFiltrados = this.servicos.filter((item) => {
        return item.descricao.toLowerCase().includes(query.toLowerCase());
      });
    }
  }

  selecionarProfissional(profissional: Pessoa) {
    this.profissionalText = profissional.nome;
    this.filtroHorarios.profissional = profissional;
    this.modalProfissional.dismiss();
  }

  selecionarData() {
    this.dataText = this.dataSelecionada?.toString();
    this.filtroHorarios.data = this.dataSelecionada;
    this.modalData.dismiss();

    this.consultarHorarios();
  }

  consultarHorarios() {
    this.agendamentoService.consultarHorarios(this.filtroHorarios).subscribe(response => {
      this.horarios = response.entity;
    });
  }

  abrirModalResumo(horario: string) {
    this.modalResumo.present();
    this.montarReserva(horario);
  }

  montarReserva(horarioSelecionado: string) {
    this.reserva.cliente = this.usuarioLogado.pessoa
    this.reserva.funcionario = this.filtroHorarios.profissional!;
    this.reserva.servicos = this.filtroHorarios.servicos!;

    let dataInicial = this.getDataInicial(horarioSelecionado);
    this.reserva.dataInicial = dataInicial
    this.reserva.dataFim = this.getDataFim(dataInicial);

    this.setTextsNaReserva();
  }

  setTextsNaReserva() {
    let total = this.servicos[0].valor;
    this.reserva.totalText = total.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

    let dataInicial =  this.reserva.dataInicial;
    let dataFim = this.reserva.dataFim;

    const formatador = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const partesData = formatador.formatToParts(dataInicial);
    const data = partesData.map(part => part.value).join('');

    const horaInicial = dataInicial.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const horaFinal = dataFim.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    this.reserva.dataHoraText = data + " - " + horaInicial + " às " + horaFinal;
  }

  getDataInicial(horarioSelecionado: string) {
    let dataInicial = new Date(this.filtroHorarios.data!);
    let horaInicial = Number(horarioSelecionado.substring(0, 2));
    let minutoInicial = Number(horarioSelecionado.substring(3, 5));
    dataInicial.setHours(horaInicial, minutoInicial, 0, 0);
    return dataInicial;
  }

  getDataFim(dataInicial: Date) {
    let tempoTotalServicos = this.getTempoTotalServicos();
    let qntHorariosNecessarios = Math.ceil(tempoTotalServicos/30);
    let horasFinais = Math.floor(qntHorariosNecessarios * 30 / 60);
    let minutosFinais = qntHorariosNecessarios * 30 % 60;
    let dataFinal = new Date(dataInicial);
    dataFinal.setHours(dataInicial.getHours() + horasFinais, dataInicial.getMinutes() + minutosFinais, 0, 0);
    return dataFinal;
  }

  getTempoTotalServicos() {
    let tempoTotalServicos = 0;
    this.filtroHorarios.servicos.forEach((servico: { tempo: number; }) => {
      tempoTotalServicos += servico.tempo;
    });
    return tempoTotalServicos;
  }

  confirmar() {
    this.agendamentoService.salvarReserva(this.reserva).subscribe();
    this.modalResumo.dismiss();
    this.voltar();
  }

  voltar() {
    this.navigation.navigateRoot("/tabs/reserva")
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

  obterConteudoFormatado(imagem: Imagem) {

    return 'data:' + imagem.tipo + ';base64,' + imagem.conteudo;

  }
}
