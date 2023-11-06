import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss']
})
export class PerfilPage {

  constructor() {}

  visualizar:boolean = true;

  ngOnInit() {
    
  }

  editar() {

    this.visualizar = false;

  }

  salvar() {

    this.visualizar = true;

  }

}
