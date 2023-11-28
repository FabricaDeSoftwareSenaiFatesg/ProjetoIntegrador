import {Entidade} from "../modelo/entidade.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UsuarioModel} from "../modelo/usuario.model";

export class BaseService <E extends Entidade> {

  constructor(
    public http: HttpClient,
    public path: string
  ) {}

  public readonly url = "http://localhost:8080";

  listar(): Observable<E> {
    return this.http.get<E>(`${this.url}/${this.path}`);
  }

  consultar(id: number): Observable<E> {
    return this.http.get<E>(`${this.url}/${this.path}/${id}`);
  }

  getUsuarioLogado(): Observable<UsuarioModel>{
    return this.http.get<UsuarioModel>(`${this.url}/usuario/get-usuario-logado`);
  }
}
