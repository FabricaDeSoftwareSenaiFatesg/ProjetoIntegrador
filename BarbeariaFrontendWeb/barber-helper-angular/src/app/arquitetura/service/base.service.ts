import {HttpClient} from "@angular/common/http";
import {Entidade} from "../modelo/entidade.model";
import {first} from 'rxjs/operators';

export class BaseService<E extends Entidade> {

  constructor(
    public httpClient: HttpClient,
    public path: string,
    ) { }

  public readonly API = 'http://localhost:8080';

  listar() {

    return this.httpClient.get<E[]>(`${this.API}/${this.path}`);

  }

  get(id: number) {

    return this.httpClient.get<E>(`${this.API}/${this.path}/${id}`);

  }

  salvar(entidade: E) {

    return this.httpClient.post<E>(`${this.API}/${this.path}`, entidade);

  }

  alterar(entidade: E) {

    return this.httpClient.put<E>(`${this.API}/${this.path}`, entidade).pipe(first());

  }

  status(id: string) {

    return this.httpClient.put<E>(`${this.API}/${this.path}/${id}`, null);

  }

  remove(id: string) {

    return this.httpClient.delete(`${this.API}/${this.path}/${id}`).pipe(first());

  }

  logout() {
    return this.httpClient.get<any>(`${this.API}/usuario/logout`);
  }

  getUsuarioLogado() {
    return this.httpClient.get<any>(`${this.API}/usuario/get-usuario-logado`);
  }

  usuarioTemAtribuicao() {
    return this.httpClient.get<any>(`${this.API}/usuario/usuario-tem-atribuicao`);
  }

}
