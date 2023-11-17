import {Component, OnInit, ViewChild} from '@angular/core';
import {IonModal, NavController} from "@ionic/angular";
import {Servico} from "../../../../arquitetura/modelo/servico.model";
import {Pessoa} from "../../../../arquitetura/modelo/pessoa.model";
import {FiltroHorarios} from "../../../../arquitetura/modelo/filtro-horarios.model";

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.page.html',
  styleUrls: ['./agendamento.page.scss'],
})
export class AgendamentoPage implements OnInit {
  @ViewChild('modalProfissional', { static: true }) modalProfissional!: IonModal;
  @ViewChild('modalData', { static: true }) modalData!: IonModal;
  @ViewChild('modalServicos', { static: true }) modalServicos!: IonModal;

  constructor(private navigation: NavController) { }

  dataSelecionada?: Date;
  filtroHorarios: FiltroHorarios = new FiltroHorarios();
  listaProfissionais: Pessoa[] = this.getListaProfissionais();
  servicos: Servico[] = this.getListaServicos();
  servicosFiltrados: Servico[] = [];
  servicosText: string = 'Serviços';
  profissionalText: string = 'Profissional';
  dataText?: string = 'Data';
  products: {name: string}[] = [
    {name: '11:00'},
    {name: '11:01'},
    {name: '11:02'},
    {name: '11:03'},
    {name: '11:04'},
    {name: '11:05'},
    {name: '11:06'},
    {name: '11:07'},
    {name: '11:08'}
  ]
  responsiveOptions: {breakpoint: string, numVisible: number, numScroll:number}[] = [
    {
      breakpoint: '1199px',
      numVisible: 4,
      numScroll: 4
    },
  ];

  ngOnInit() {
    this.servicosFiltrados = [...this.servicos];
  }

  getListaProfissionais(): Pessoa[] {
    let listaProfissionais:Pessoa[] = [];

    let profissional = new Pessoa();
    profissional.flagFuncionario = true;
    profissional.nome = 'nome';

    listaProfissionais.push(profissional);
    listaProfissionais.push(profissional);
    listaProfissionais.push(profissional);

    return listaProfissionais;
  }

  getListaServicos(): Servico[] {
    let listaServicos: Servico[] = [];

    for (let i = 0; i <= 10; i++) {
      let servico = new Servico();
      servico.descricao = 'serviço' + i;
      servico.tempo = 10;
      servico.valor = 10;
      listaServicos.push(servico);

    }

    return listaServicos;
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
  }

  selecionarServico(servico: Servico) {
    this.servicosText = servico.descricao;
    this.filtroHorarios.servicos.push(servico);
    this.modalServicos.dismiss();
  }

  fecharModalServicos() {
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

  voltar() {
    this.navigation.navigateRoot("/tabs/reserva")
  }
}
