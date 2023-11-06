import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Entidade } from '../modelo/entidade.model';
import { BaseService } from '../service/base.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Usuario } from '../modelo/usuario.model';

@Component({
  template: ''
})
export abstract class BaseComponent<E extends Entidade> implements OnInit {

  entidade: E;

  entidadeForm: E;

  listaEntidades: E[] = [];

  modalCadastro: boolean = false;

  isVisualizacao: boolean = false;

  usuarioLogado: Usuario;
  usuarioService: any;

  constructor(
    protected changeDectetor: ChangeDetectorRef,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected service: BaseService<E>,
    protected messageService: MessageService) {

  }

  preSalvar(entidade: E) {

  }

  preAlterar(entidade: E) {

  }

  salvar(form?: any) {

    if (this.entidade !== null && this.entidade !== undefined) {

      if (!this.entidade.id) {

        this.preSalvar(this.entidade);

        this.service.salvar(this.entidade).subscribe(() => {

          this.modalCadastro = false;

          this.executarDepoisDeSalvar();

        });

      } else {

        this.preAlterar(this.entidade);

        this.service.alterar(this.entidade).subscribe(() => {

          this.modalCadastro = false;

          this.executarDepoisDeSalvar();

        });

      }

    }

  }

  public executarDepoisDeSalvar():void {

    this.listar();

  }

  protected abstract newEntidade(): E;

  acaoAposCarregarEntidade() {

  }

  ngOnInit() {

    this.getUsuarioLogado();

    this.listar();

    this.entidadeForm = this.newEntidade();

  }

  ngAfterViewChecked(): void {

    if (this.changeDectetor) {

      this.changeDectetor.detectChanges();

    }

  }

  ngAfterViewInit(): void {

  }

  protected inicializarManutencao() {

    let id: number = this.entidadeForm.id;

    if (id) {

      this.service.get(id).subscribe((entidade) => {

        this.entidadeForm = entidade;

        this['acaoAposCarregarEntidade'] && this['acaoAposCarregarEntidade']();

      });

    } else {

      this.entidadeForm = this.newEntidade();

    }

  }

  cadastrar(entidadeConsulta?: E) {

    if (entidadeConsulta) {

      this.entidadeForm = entidadeConsulta;

    } else {

      this.entidadeForm = this.newEntidade();

    }

    this.inicializarManutencao();

    this.modalCadastro = true;

  }

  visualizar(entidadeConsulta: E) {

    this.isVisualizacao = true;

    this.cadastrar(entidadeConsulta);

  }

  excluir(entidadeConsulta: E) {

    this.service.remove(entidadeConsulta.id+"").subscribe(retorno => {

      this.listar();

    });

  }

  listar() {

    this.service.listar().subscribe(retorno => {

      this.listaEntidades = retorno;

      this.changeDectetor.detectChanges();

    });

  }

  status(id: any) {

    this.service.status(id).subscribe(() => {});

  }

  adicionarMensagemAlerta(mensagem: string) {

    this.messageService.add({severity:'warn', summary:'Alerta', detail: mensagem});

  }

  adicionarMensagemInfo(mensagem: string) {

    this.messageService.add({severity:'info', summary:'Informação', detail: mensagem});

  }

  adicionarMensagemErro(mensagem: string) {

    this.messageService.add({severity:'error', summary:'Erro', detail: mensagem});

  }

  adicionarMensagemSucesso(mensagem: string) {

    this.messageService.add({severity:'success', summary:'Sucesso', detail: mensagem});

  }

  getUsuarioLogado() {

    this.service.getUsuarioLogado().subscribe(retorno => {

      this.usuarioLogado = retorno;

      this.changeDectetor.detectChanges();

    });

  }

}
