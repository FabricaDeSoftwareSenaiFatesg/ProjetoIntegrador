import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {UsuarioModel} from "../modelo/usuario.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseService<UsuarioModel>{

  constructor(httpClient: HttpClient) {
    super(httpClient, "login");
  }

  logar(usuario: UsuarioModel): Observable<any>{
    return this.http.post<any>(`${this.url}/${this.path}`, { 'usuario': usuario.email, 'senha': usuario.senha });
  }

  inserirUsuarioNoServidorDeAutenticacao(usuario: UsuarioModel) {
    return this.http.post<any>(`${this.url}/${this.path}/criar`, { 'login': usuario.email, 'pass': usuario.senha });
  }

  salvar(usuario: UsuarioModel) {
    return this.http.post(`${this.url}/usuario`, usuario);
  }

  alterar(usuario: UsuarioModel) {
    return this.http.put(`${this.url}/usuario`, usuario);
  }

  logout() {
    return this.http.get<any>(`${this.url}/usuario/logout`)
  }

  getUsuarioLogado(): Observable<UsuarioModel>{
    return this.http.get<UsuarioModel>(`${this.url}/usuario/get-usuario-logado`);
  }
}
