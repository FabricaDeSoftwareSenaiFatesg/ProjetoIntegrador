import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/arquitetura/component/base.component';
import { Produto } from 'src/app/arquitetura/modelo/produto.model';
import { ProdutoService } from './produto.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css'],
  providers: [MessageService]
})
export class ProdutoComponent extends BaseComponent<Produto> {

  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
    protected override router: Router,
    protected override activatedRoute: ActivatedRoute,
    protected override service: ProdutoService,
    protected override messageService: MessageService) {

    super(changeDetectorRef, router, activatedRoute, service, messageService);

    super.ngOnInit();

  }

  override ngOnInit(): void {

    super.listar();

  }

  protected override newEntidade(): Produto {

    return new Produto();

  }

  override salvar() {

    this.entidade = this.entidadeForm;

    super.salvar();

    this.adicionarMensagemSucesso("Incluído com sucesso!");

  }

}
