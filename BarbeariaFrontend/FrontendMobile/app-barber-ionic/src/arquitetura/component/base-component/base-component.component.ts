import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Entidade} from "../../modelo/entidade.model";
import {UsuarioModel} from "../../modelo/usuario.model";
import {BaseService} from "../../services/base.service";

@Component({
  template: ''
})
export class BaseComponent<T extends Entidade>  implements OnInit {

  constructor(
    protected service: BaseService<T>,
    protected changeDetector: ChangeDetectorRef
  ) { }

  usuarioLogado: UsuarioModel = new UsuarioModel();

  ngOnInit() {
    // this.getUsuarioLogado();
  }

  getUsuarioLogado() {
    this.service.getUsuarioLogado().subscribe(response => {
      this.usuarioLogado = response;
      this.changeDetector.detectChanges();
    });
  }
}
