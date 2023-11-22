import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "./base.service";
import {Servico} from "../modelo/servico.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServicoService extends BaseService<Servico>{

  constructor(httpClient: HttpClient) {
    super(httpClient, "servico");
  }

  listarDTO(): Observable<Servico[]>{
    return this.http.get<Servico[]>(`${this.url}/${this.path}/listar-dtos`);
  }
}
