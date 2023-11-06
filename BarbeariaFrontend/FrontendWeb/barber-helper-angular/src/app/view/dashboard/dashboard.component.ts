import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../arquitetura/component/base.component";
import {Dashboard} from "../../arquitetura/modelo/dashboard.model";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {DashboardService} from "./dashboard.service";
import {Produto} from "../../arquitetura/modelo/produto.model";
import {Servico} from "../../arquitetura/modelo/servico.model";
import {FuncionarioPorReserva} from "../../arquitetura/modelo/funcionarioPorReserva.model";
import {ServicoPorQuantidade} from "../../arquitetura/modelo/servicoPorQuantidade.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [MessageService]
})
export class DashboardComponent extends BaseComponent<Dashboard> implements OnInit {

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    protected override router: Router,
    protected override activatedRoute: ActivatedRoute,
    protected override service: DashboardService,
    protected override messageService: MessageService) {

    super(changeDetectorRef, router, activatedRoute, service, messageService);
    this.ngOnInit();
  }

  reservas: Servico[] = [];
  pedidos: Produto[] = [];
  funcionariosPorReserva: FuncionarioPorReserva[] = [];
  servicosPorQuantidade: ServicoPorQuantidade[] = [];

  basicData: any;
  basicOptions: any;
  data: any;
  options: any;
  dataGraficoFuncionarios: any;
  optionsGraficoFuncionario: any;
  dataGraficoServicos: any;
  optionsGraficoServicos: any;

  override ngOnInit(): void {
    this.consultarValoresParaDashboard();
  }

  consultarValoresParaDashboard() {
    this.service.listarDashboardDTO().subscribe(retorno => {
      this.reservas = retorno.reservas;
      this.pedidos = retorno.pedidos;
      this.funcionariosPorReserva = retorno.funcionariosPorReserva;
      this.servicosPorQuantidade = retorno.servicosPorQuantidade;

      this.inicializarGraficoVendas();
      this.inicializarGraficoReservas();
      this.inicializarGraficoFuncionarios();
      this.inicializarGraficoServicosMaisUtilizados();
    });
  }

  inicializarGraficoVendas(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const dataFormatada = this.getDataDosPedidos().map(date => (new Date(date)).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }));

    this.basicData = {
      labels: dataFormatada,
      datasets: [
        {
          label: 'Quantidade de Produtos',
          data: this.getDadosProdutos(),
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }
      ]
    };

    this.basicOptions = {
      plugins: {
        title: {
          display: true,
          text: 'Quantidade de Produto por Pedido',
          font: {
            size: 18,
            family: 'Poppins',
            weight: 500
          }
        },
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  getDataDosPedidos(): Date[]{
    let datas: Date[] = [];

    this.pedidos?.forEach((pedido: any) => {
      datas.push(pedido?.dataCadastro);
    })

    return datas;
  }

  getDadosProdutos(): number[]{
    let quantidadeProdutos: number[] = [];

    this.pedidos.forEach((pedido: any) => {
      pedido?.produtos.forEach((produto: any) => {
        quantidadeProdutos.push(produto?.quantidade);
      });
    });

    return quantidadeProdutos;
  }

  inicializarGraficoReservas(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const dataFormatada = this.getDataDasReservas().map(date => (new Date(date)).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }));

    this.data = {
      labels: dataFormatada,
      datasets: [
        {
          label: 'Quantidade de Serviços',
          data: this.getDadosReservas(),
          fill: true,
          borderColor: documentStyle.getPropertyValue('--orange-500'),
          tension: 0.4,
          backgroundColor: 'rgba(255,167,38,0.2)'
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        title: {
          display: true,
          text: 'Quantidade de Serviço por Reserva',
          font: {
            size: 18,
            family: 'Poppins',
            weight: 500
          }
        },
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    };
  }

  getDataDasReservas(): Date[]{
    let datas: Date[] = [];

    this.reservas.forEach((reserva: any) => {
        datas.push(reserva?.dataCadastro);
    })

    return datas;
  }

  getDadosReservas(): number[] {
    let quantidadeServicos: number[] = [];

    this.reservas?.forEach((reserva: any) => {
      quantidadeServicos.push(reserva?.servicos?.length);
    });

    return quantidadeServicos;
  }

  inicializarGraficoFuncionarios() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.dataGraficoFuncionarios = {
      datasets: [
        {
          data: this.getQuantidadeDeServicoDeCadaFuncionario(),
          backgroundColor: [
            documentStyle.getPropertyValue('--red-500'),
            documentStyle.getPropertyValue('--green-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--bluegray-500'),
            documentStyle.getPropertyValue('--blue-500')
          ],
          label: 'Serviços Prestados'
        }
      ],
      labels: this.getNomeDosFuncionarios()
    };

    this.optionsGraficoFuncionario = {
      plugins: {
        title: {
          display: true,
          text: 'Quantidade de Serviço por Funcionário',
          font: {
            size: 18,
            family: 'Poppins',
            weight: 500
          }
        },
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        r: {
          grid: {
            color: surfaceBorder
          }
        }
      }
    };
  }

  getQuantidadeDeServicoDeCadaFuncionario(): number[]{
    let quantidadeDeServicoPorFuncionario: number[] = [];

    this.funcionariosPorReserva.forEach((funcionario: any) => {
      quantidadeDeServicoPorFuncionario.push(funcionario.quantidadeServicos);
    })

    return quantidadeDeServicoPorFuncionario;
  }

  getNomeDosFuncionarios(): string[] {
    let nomeDosFuncionarios: string[] = [];

    this.funcionariosPorReserva.forEach((funcionario: any) => {
      nomeDosFuncionarios.push(funcionario.nomeFuncionario);
    });

    return nomeDosFuncionarios;
  }

  inicializarGraficoServicosMaisUtilizados() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.dataGraficoServicos = {
      labels: this.getNomeDoServico(),
      datasets: [
        {
          data: this.getQuantidadeDeServico(),
          backgroundColor: [documentStyle.getPropertyValue('--brown-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--brown-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
        }
      ]
    };

    this.optionsGraficoServicos = {
      cutout: '60%',
      plugins: {
        title: {
          display: true,
          text: 'Serviços Mais Utilizados',
          font: {
            size: 18,
            family: 'Poppins',
            weight: 500
          }
        },
        legend: {
          labels: {
            color: textColor
          }
        }
      }
    };
  }

  getQuantidadeDeServico(): number[]{
    let quantidadeDeServicos: number[] = [];

    this.servicosPorQuantidade?.forEach((servico: any) => {
      quantidadeDeServicos.push(servico?.quantidadeServico);
    })

    return quantidadeDeServicos;
  }

  getNomeDoServico(): string[] {
    let nomeDosServicos: string[] = [];

    this.servicosPorQuantidade?.forEach((servico: any) => {
      nomeDosServicos.push(servico?.nomeServico);
    });

    return nomeDosServicos;
  }

  protected newEntidade(): Dashboard {
    return new Dashboard();
  }

}
