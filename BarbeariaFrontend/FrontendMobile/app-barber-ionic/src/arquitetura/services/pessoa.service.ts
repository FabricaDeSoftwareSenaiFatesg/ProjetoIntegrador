import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseService} from "./base.service";
import {Pessoa} from "../modelo/pessoa.model";

@Injectable({
  providedIn: 'root'
})
export class PessoaService extends BaseService<Pessoa>{

  constructor(httpClient: HttpClient) {
    super(httpClient, "pessoa");
  }

  listarProfissionais(): Observable<Pessoa[]>{
    return this.http.get<Pessoa[]>(`${this.url}/${this.path}/valores-dashboard`);
  }
}
