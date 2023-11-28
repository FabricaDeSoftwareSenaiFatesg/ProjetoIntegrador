import {Component, ViewChild} from '@angular/core';
import {IonModal, NavController} from '@ionic/angular';
import {UsuarioService} from "../../../arquitetura/services/usuario.service";
import {UsuarioModel} from "../../../arquitetura/modelo/usuario.model";

@Component({
  selector: 'app-home',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})

export class LoginPage {
  @ViewChild('modalLogin', { static: true }) modalLogin!: IonModal;
  @ViewChild('modalCadastro', { static: true }) modalCadastro!: IonModal;

  constructor(
    private usuarioService: UsuarioService,
    private navigation: NavController,
  ) {}

  usuario: UsuarioModel = new UsuarioModel();

  ngOnInit() {}
  acessar() {
    this.usuarioService.logar(this.usuario).subscribe(response => {
      if (response.access_token !== null) {
        localStorage.setItem("ads_access_token", response.access_token);
        this.navigation.navigateRoot("");
        this.modalLogin.dismiss();
      }
    });
  }

  cadastrar() {
    this.usuarioService.inserirUsuarioNoServidorDeAutenticacao(this.usuario).subscribe(() => {
      this.usuarioService.salvar(this.usuario).subscribe(() => {
          this.modalCadastro.dismiss();
          this.usuario = new UsuarioModel();
      });
    });
  }

}
