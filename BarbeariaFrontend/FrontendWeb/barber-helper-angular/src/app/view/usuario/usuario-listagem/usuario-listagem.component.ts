import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseComponent} from 'src/app/arquitetura/component/base.component';
import {Usuario} from 'src/app/arquitetura/modelo/usuario.model';
import {UsuarioService} from '../usuario.service';
import {MessageService} from 'primeng/api';
import {TipoUsuarioEnum} from "../../../arquitetura/modelo/tipo-usuario.enum";

@Component({
  selector: 'app-usuario-listagem',
  templateUrl: './usuario-listagem.component.html',
  styleUrls: ['./usuario-listagem.component.css'],
  providers: [MessageService]
})
export class UsuarioListagemComponent extends BaseComponent<Usuario> implements OnInit {

  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
    protected override router: Router,
    protected override activatedRoute: ActivatedRoute,
    protected override service: UsuarioService,
    protected override messageService: MessageService) {

    super(changeDetectorRef, router, activatedRoute, service, messageService);
    super.ngOnInit();
  }

  tiposUsuario: TipoUsuarioEnum[] = [];
  usuarioLogadoTemAtribuicao: boolean = true;

  override ngOnInit(): void {
    super.listar();
    this.inicializarTiposUsuario();
    this.service.usuarioTemAtribuicao().subscribe( retorno => {
      this.usuarioLogadoTemAtribuicao = retorno;
    });
  }

  protected override newEntidade(): Usuario {
    return new Usuario();
  }

  inicializarTiposUsuario() {
    this.tiposUsuario.push(TipoUsuarioEnum.CLIENTE, TipoUsuarioEnum.FUNCIONARIO, TipoUsuarioEnum.ADMINISTRADOR);
  }

  override salvar() {

    this.service.inserirUsuarioNoServidorDeAutenticacao(this.entidadeForm.email, this.entidadeForm.senha).subscribe(() => {

        this.service.salvar(this.entidadeForm).subscribe(() => {
          this.adicionarMensagemSucesso("Incluído com sucesso!");
          this.router.navigate(['']);
        }, (error) => {
          this.adicionarMensagemAlerta("Já existe um usuário com esse email ou essa senha");
        });

      }
    );

  }

}
