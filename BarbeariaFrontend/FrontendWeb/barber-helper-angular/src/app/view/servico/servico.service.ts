import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { BaseService } from 'src/app/arquitetura/service/base.service';
import { Servico } from 'src/app/arquitetura/modelo/servico.model';

@Injectable({
  providedIn: 'root'
})
export class ServicoService extends BaseService<Servico>{

  constructor(httpClient: HttpClient) {
    super( httpClient, 'servico');
  }

  listarServicosDTO() {
    return this.httpClient.get<any>(`${this.API}/${this.path}/listar-dtos`);
  }
}
