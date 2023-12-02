import {Component, OnInit} from '@angular/core';
import {UsuarioService} from "../../../arquitetura/services/usuario.service";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  flagFuncionario!: boolean;

  constructor(
    private usuarioService: UsuarioService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.consultarUsuarioLogado();
  }

  consultarUsuarioLogado() {
    this.usuarioService.getUsuarioLogado().subscribe(response => {
      this.flagFuncionario = response.pessoa.flagFuncionario;
    });
  }
}
