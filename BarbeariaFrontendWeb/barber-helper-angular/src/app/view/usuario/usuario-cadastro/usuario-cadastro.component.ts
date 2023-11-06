import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/arquitetura/component/base.component';
import { Usuario } from 'src/app/arquitetura/modelo/usuario.model';
import { UsuarioService } from '../usuario.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css'],
  providers: [MessageService]
})
export class UsuarioCadastroComponent extends BaseComponent<Usuario> implements OnInit {

  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
    protected override router: Router,
    protected override activatedRoute: ActivatedRoute,
    protected override service: UsuarioService,
    protected override messageService: MessageService) {

    super(changeDetectorRef, router, activatedRoute, service, messageService);

    super.ngOnInit();

  }

  value: string;

  override ngOnInit(): void {

    this.newEntidade();

  }

  protected override newEntidade(): Usuario {

    return new Usuario();

  }

  override preSalvar() {

    console.log(this.entidade);

  }

}
