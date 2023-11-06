import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/arquitetura/modelo/usuario.model';
import { BaseService } from 'src/app/arquitetura/service/base.service';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseService<Usuario> {

  constructor(httpClient: HttpClient) {
    super( httpClient, "usuario");
  }

  autenticarUsuario(usuario: Usuario) {
    return this.httpClient.post<boolean>(`${this.API}/${this.path}/autenticar-usuario`, usuario);
  }

  public logar(usuario:string, senha:string): Observable<any>{
    return this.httpClient.post('http://localhost:8080/login', {'usuario': usuario, 'senha': senha})
  }

  public inserirUsuarioNoServidorDeAutenticacao(login: string, senha:string){
    return this.httpClient.post('http://localhost:8080/login/criar', {'login': login, 'pass': senha})
  }

}
