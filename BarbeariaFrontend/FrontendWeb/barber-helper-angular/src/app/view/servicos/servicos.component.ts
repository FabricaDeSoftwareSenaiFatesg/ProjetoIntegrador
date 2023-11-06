import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseComponent} from 'src/app/arquitetura/component/base.component';
import {MessageService} from 'primeng/api';
import {Servico} from "../../arquitetura/modelo/servico.model";
import {ServicoService} from "../servico/servico.service";

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css'],
  providers: [MessageService]
})
export class ServicosComponent extends BaseComponent<Servico> implements OnInit {

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    protected override router: Router,
    protected override activatedRoute: ActivatedRoute,
    protected override service: ServicoService,
    protected override messageService: MessageService) {

    super(changeDetectorRef, router, activatedRoute, service, messageService);
    this.ngOnInit();
  }

  servicos: Servico[] = [];

  override ngOnInit(): void {
    this.listar();
  }

  protected override newEntidade(): Servico {
    return new Servico();
  }

  override listar() {
    this.service.listarServicosDTO().subscribe(retorno => {
      this.servicos = retorno;
      this.changeDetectorRef.detectChanges();
    });
  }

  obterConteudoFormatado(servico: Servico) {
    if (servico.imagem.conteudo.indexOf('base64,') > -1) {
      return servico.imagem.conteudo;
    } else {
      return 'data:' + servico.imagem.tipo + ';base64,' + servico.imagem.conteudo;
    }
  }

}
