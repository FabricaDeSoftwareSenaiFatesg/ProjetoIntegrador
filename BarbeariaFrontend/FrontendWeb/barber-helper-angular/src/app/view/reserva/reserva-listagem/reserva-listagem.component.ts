import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {BaseComponent} from "../../../arquitetura/component/base.component";
import {Reserva} from "../../../arquitetura/modelo/reserva.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ReservaService} from "../reserva.service";
import {PessoaService} from "../../pessoa/pessoa.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-reserva-listagem',
  templateUrl: './reserva-listagem.component.html',
  styleUrls: ['./reserva-listagem.component.css'],
  providers: [MessageService]
})
export class ReservaListagemComponent extends BaseComponent<Reserva> implements OnInit {

  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
    protected override router: Router,
    protected override activatedRoute: ActivatedRoute,
    protected override service: ReservaService,
    protected pessoaService: PessoaService,
    protected override messageService: MessageService) {

    super(changeDetectorRef, router, activatedRoute, service, messageService);

    super.ngOnInit();

  }

  override listaEntidades: any[] = [];
  modalFiltro: boolean = false;

  reservas: Reserva[] = [];
  data: string;

  profissionais: any = [];
  profissionalSelecionado: any;

  reservaVizualizacao: any = null;

  override async ngOnInit(): Promise<void> {
    this.consultarProfissionais();
    await this.inicializarFiltros();
    this.listarFiltrado();
  }

  async inicializarFiltros(): Promise<void>{
    const formatter = new Intl.DateTimeFormat('en-US', {year:'numeric', month:'2-digit', day:'2-digit'});
    const parts = formatter.formatToParts(new Date());
    this.data = `${parts[4].value}-${parts[0].value}-${parts[2].value}`;
    this.profissionalSelecionado = await this.getIdUsuarioLogado();
  }

  getIdUsuarioLogado(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.service.getUsuarioLogado().subscribe(response => {
        resolve(response.id);
      }, error => {
        reject(error);
      });
    });
  }

  protected override newEntidade(): Reserva {
    return new Reserva();
  }

  consultarProfissionais() {
    this.pessoaService.getFuncionarios().subscribe(response => {
      this.profissionais = response;
    });
  }

  filtrar() {
    this.modalFiltro = true;
  }

  listarFiltrado() {
    let dataSelecionadaMaisTresHoras = new Date(this.data);
    dataSelecionadaMaisTresHoras.setHours(dataSelecionadaMaisTresHoras.getHours() + 3);
    let pesquisaHorarios = {
      profissional: {id:this.profissionalSelecionado},
      data: dataSelecionadaMaisTresHoras
    };
    console.log(pesquisaHorarios);

    this.service.listarFiltrado(pesquisaHorarios).subscribe(response => {
      this.listaEntidades = response.entity;
    });
  }

  override visualizar(entidadeConsulta: Reserva) {
    this.isVisualizacao = true;
    this.service.consultarServicosDaReserva(entidadeConsulta.id).subscribe(response => {
      this.reservaVizualizacao = {...entidadeConsulta, ...response.entity};
    });
  }

  redirecionarParaAgendamento(rota: string): void {
    this.router.navigateByUrl(rota);
  }
}
