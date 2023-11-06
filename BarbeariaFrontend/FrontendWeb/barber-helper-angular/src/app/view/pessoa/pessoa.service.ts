import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoa } from 'src/app/arquitetura/modelo/pessoa.model';
import { BaseService } from 'src/app/arquitetura/service/base.service';

@Injectable({
  providedIn: 'root'
})
export class PessoaService extends BaseService<Pessoa> {

  constructor(httpClient: HttpClient) {
    super( httpClient, "pessoa");
  }

  testeRetornarCpf(cpf: string) {

    return this.httpClient.post<any>(`${this.API}/${this.path}/retornar-cpf`, cpf);

  }

  getFuncionarios(){
    return this.httpClient.get<any>(`${this.API}/${this.path}/valores-dashboard`);
  }

}
