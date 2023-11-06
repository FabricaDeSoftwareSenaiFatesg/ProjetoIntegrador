import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../arquitetura/component/base.component";
import {Usuario} from "../../arquitetura/modelo/usuario.model";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from 'primeng/api';
import {UsuarioService} from '../usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent extends BaseComponent<Usuario> implements OnInit{

  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
    protected override router: Router,
    protected override activatedRoute: ActivatedRoute,
    protected override service: UsuarioService,
    protected override messageService: MessageService) {

    super(changeDetectorRef, router, activatedRoute, service, messageService);

    this.ngOnInit();
  }

  flagNovoUsuario: boolean = false;
  flagRecuperarSenha: boolean = false;
  usuarioLogin: Usuario = new Usuario();
  novoUsuario: Usuario = new Usuario();
  usuarioRecuperarSenha: Usuario = new Usuario();

  override ngOnInit() : void {
    if(localStorage.getItem("ads_access_token") !== null){
      localStorage.removeItem("ads_access_token");
    }
    this.newEntidade();
  }

  protected override newEntidade(): Usuario {
    return new Usuario();
  }

  login() {
    this.validarTipoMensagem(this.usuarioLogin.email, this.usuarioLogin.senha)

    this.service.logar(this.usuarioLogin.email, this.usuarioLogin.senha).subscribe(
      r => {
        if (r.access_token !== null){
          localStorage.setItem("ads_access_token", r.access_token);
          this.router.navigate(['/']);
        }
      }
    );
  }

  validarTipoMensagem(login: string, senha: string){
    if (!login && senha){
      this.adicionarMensagemAlerta("Preencha o campo login!");
    }

    if (login && !senha){
      this.adicionarMensagemAlerta("Preencha o campo senha!");
    }

    if (!login && !senha){
      this.adicionarMensagemAlerta("Preencha todos os campos!");
    }
  }

  recuperarSenha() {

    this.flagRecuperarSenha = true;

  }

  cadastrarUsuario() {

    this.flagNovoUsuario = true;

  }

  voltarLogin() {

    this.flagNovoUsuario = false;

    this.flagRecuperarSenha = false;

  }

  enviarEmailComSenhaNova() {
    console.log(this.usuarioRecuperarSenha);
  }

  cadastrarNovoUsuario() {

    if (this.validarCampos(this.novoUsuario.email, this.novoUsuario.senha, this.novoUsuario.pessoa.cpf, this.novoUsuario.pessoa.nome, this.novoUsuario.pessoa.telefone)) {

      this.service.inserirUsuarioNoServidorDeAutenticacao(this.novoUsuario.email, this.novoUsuario.senha).subscribe(() => {

          this.service.salvar(this.novoUsuario).subscribe(() => {
            this.router.navigate(['']);
          }, (error) => {
            this.adicionarMensagemAlerta("Já existe um usuário com esse email ou essa senha");
          });

        }
      );

    }

  }

  validarCampos(email: string, senha: string, cpf: string, nome: string, telefone: string) : boolean{

    if(!email && !senha && !cpf && !nome && !telefone){
      this.adicionarMensagemAlerta("Preencha todos os campos!");
      return false;
    }

    if(!nome){
      this.adicionarMensagemAlerta("O campo nome deve ser preenchido");
      return false;
    }

    if(!telefone){
      this.adicionarMensagemAlerta("O campo telefone deve ser preenchido");
      return false;
    }

    if(!this.validarEmail(email)){
      this.adicionarMensagemAlerta("Email inválido");
      return false;
    }

    if(!this.validarSenha(senha)){
      this.adicionarMensagemAlerta("Senha deve ter no mínimo 5 caracteres");
      return false;
    }

    if(!this.validarCpf(cpf)){
      this.adicionarMensagemAlerta("CPF inválido");
      return false;
    }

    return true;

  }

  validarEmail(email: string) {
    var emailPattern =  /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    return emailPattern.test(email);
  }

  validarSenha(senha: string) {
    if(senha.length > 4) return true;
    else return false;
  }

  validarCpf(cpf: string) {
    var soma;
    var resto;
    soma = 0;

    cpf = cpf.replaceAll(".", "");
    cpf = cpf.replace("-", "");
    if (cpf == "00000000000") return false;

    for (var i=1; i<=9; i++) soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11))  resto = 0;
    if (resto != parseInt(cpf.substring(9, 10)) ) return false;

    soma = 0;
    for (var i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11))  resto = 0;
    if (resto != parseInt(cpf.substring(10, 11) ) ) return false;
    return true;
  }

}
