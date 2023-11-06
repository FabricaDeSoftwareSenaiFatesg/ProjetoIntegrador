import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {ServicoService} from "./servico.service";
import {Servico} from "../../arquitetura/modelo/servico.model";
import {BaseComponent} from "../../arquitetura/component/base.component";

@Component({
  selector: 'app-servico',
  templateUrl: './servico.component.html',
  styleUrls: ['./servico.component.css'],
  providers: [MessageService]
})
export class ServicoComponent extends BaseComponent<Servico> implements OnInit{

  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
    protected override router: Router,
    protected override activatedRoute: ActivatedRoute,
    protected override service: ServicoService,
    protected override messageService: MessageService) {

    super(changeDetectorRef, router, activatedRoute, service, messageService);
    super.ngOnInit();
  }

  override ngOnInit() {
    super.listar();
  }

  protected newEntidade(): Servico {
    return new Servico();
  }

  override salvar() {
    this.entidade = this.entidadeForm;
    super.salvar();
    this.adicionarMensagemSucesso("Incluído com sucesso!");
  }
}
