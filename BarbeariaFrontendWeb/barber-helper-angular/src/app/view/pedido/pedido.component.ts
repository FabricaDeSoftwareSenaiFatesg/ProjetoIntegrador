import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProdutoService } from '../produto/produto.service';
import { Pedido } from 'src/app/arquitetura/modelo/pedido.model';
import { BaseComponent } from 'src/app/arquitetura/component/base.component';
import { MessageService } from 'primeng/api';
import { PedidoService } from '../loja/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
  providers: [MessageService]
})
export class PedidoComponent extends BaseComponent<Pedido> implements OnInit {

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    protected override router: Router,
    protected override activatedRoute: ActivatedRoute,
    protected override service: PedidoService,
    protected produtoService: ProdutoService,
    protected override messageService: MessageService) {

    super(changeDetectorRef, router, activatedRoute, service, messageService);

    this.ngOnInit();

  }

  override ngOnInit(): void {

    this.listar();

  }

  protected override newEntidade(): Pedido {

    return new Pedido();

  }

}
