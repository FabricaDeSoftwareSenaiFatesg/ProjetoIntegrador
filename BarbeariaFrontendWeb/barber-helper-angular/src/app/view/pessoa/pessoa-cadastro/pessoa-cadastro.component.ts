import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pessoa } from 'src/app/arquitetura/modelo/pessoa.model';
import { PessoaService } from '../pessoa.service';
import { BaseComponent } from 'src/app/arquitetura/component/base.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent extends BaseComponent<Pessoa> implements OnInit {

  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
    protected override router: Router,
    protected override activatedRoute: ActivatedRoute,
    protected override service: PessoaService,
    protected override messageService: MessageService) {

    super(changeDetectorRef, router, activatedRoute, service, messageService);

    super.ngOnInit();

  }

  override ngOnInit(): void {

    this.newEntidade();

  }

  protected override newEntidade(): Pessoa {

    return new Pessoa();

  }

  override preSalvar() {

    console.log(this.entidade);

  }

  retornarCpf(cpf : string) {

    this.service.testeRetornarCpf(cpf).subscribe(retorno => console.log(retorno.entity));

  }

}
