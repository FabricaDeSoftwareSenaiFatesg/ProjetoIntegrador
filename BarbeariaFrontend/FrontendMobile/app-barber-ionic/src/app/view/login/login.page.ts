import {Component, ViewChild} from '@angular/core';
import {IonModal, NavController} from '@ionic/angular';
import {UsuarioService} from "../../../arquitetura/services/usuario.service";
import {UsuarioModel} from "../../../arquitetura/modelo/usuario.model";
import {MessageService} from "primeng/api";
import {TipoUsuarioEnum} from "../../../arquitetura/modelo/enum/tipo-usuario.enum";

@Component({
  selector: 'app-home',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  providers: [MessageService]
})

export class LoginPage {
  @ViewChild('modalLogin', { static: true }) modalLogin!: IonModal;
  @ViewChild('modalCadastro', { static: true }) modalCadastro!: IonModal;

  constructor(
    private usuarioService: UsuarioService,
    private navigation: NavController,
    protected messageService: MessageService
  ) {}

  usuario: UsuarioModel = new UsuarioModel();

  ngOnInit() {}
  acessar() {
    this.validarMensagemAcesso(this.usuario.email, this.usuario.senha);

    this.usuarioService.logar(this.usuario).subscribe(response => {
      if (response.access_token !== null) {
        localStorage.setItem("ads_access_token", response.access_token);
        this.navigation.navigateRoot("");
        this.modalLogin.dismiss();
      }
    });
  }

  validarMensagemAcesso(login: string, senha: string){
    if (!login && senha){
      this.modalLogin.dismiss();
      this.adicionarMensagemAlerta("Preencha o campo login!");
    }

    if (login && !senha){
      this.modalLogin.dismiss();
      this.adicionarMensagemAlerta("Preencha o campo senha!");
    }

    if (!login && !senha){
      this.modalLogin.dismiss();
      this.adicionarMensagemAlerta("Preencha todos os campos!");
    }
  }

  cadastrar() {
    if (!this.camposValidos(this.usuario)) return;

    this.usuario.tipo = TipoUsuarioEnum.CLIENTE;
    this.usuarioService.inserirUsuarioNoServidorDeAutenticacao(this.usuario).subscribe(() => {
      this.usuarioService.salvar(this.usuario).subscribe(() => {
        this.modalCadastro.dismiss();
        this.usuario = new UsuarioModel();
      });
    });
  }

  camposValidos(usuario: UsuarioModel) : boolean{
    if(!usuario.email && !usuario.senha && !usuario.pessoa.cpf && !usuario.pessoa.nome && !usuario.pessoa.telefone){
      this.adicionarMensagemAlerta("Preencha todos os campos!");
      this.modalCadastro.dismiss();
      return false;
    }

    if(!usuario.pessoa.nome){
      this.adicionarMensagemAlerta("O campo nome deve ser preenchido");
      this.modalCadastro.dismiss();
      return false;
    }

    if(!usuario.pessoa.telefone){
      this.adicionarMensagemAlerta("O campo telefone deve ser preenchido");
      this.modalCadastro.dismiss();
      return false;
    }

    if(!this.validarEmail(usuario.email)){
      this.adicionarMensagemAlerta("Email inválido");
      this.modalCadastro.dismiss();
      return false;
    }

    if(!this.validarSenha(usuario.senha)){
      this.adicionarMensagemAlerta("Senha deve ter no mínimo 5 caracteres");
      this.modalCadastro.dismiss();
      return false;
    }

    if(!this.validarCpf(usuario.pessoa.cpf)){
      this.adicionarMensagemAlerta("CPF inválido");
      this.modalCadastro.dismiss();
      return false;
    }

    return true;
  }

  validarEmail(email: string) {
    const emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    return emailPattern.test(email);
  }

  validarSenha(senha: string) {
    return senha.length > 4;
  }

  validarCpf(cpf: string) {
    let soma;
    let resto;
    soma = 0;

    cpf = cpf.replace(".", "");
    cpf = cpf.replace("-", "");
    if (cpf == "00000000000") return false;

    for (let i=1; i<=9; i++) soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11))  resto = 0;
    if (resto != parseInt(cpf.substring(9, 10)) ) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11))  resto = 0;
    return resto == parseInt(cpf.substring(10, 11));
  }

  adicionarMensagemAlerta(mensagem: string) {
    this.messageService.add({ severity:'warn', summary:'Alerta', detail: mensagem });
  }

}
