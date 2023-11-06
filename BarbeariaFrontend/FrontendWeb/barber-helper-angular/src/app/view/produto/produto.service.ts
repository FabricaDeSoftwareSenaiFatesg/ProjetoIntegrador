import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { BaseService } from 'src/app/arquitetura/service/base.service';
import { Produto } from 'src/app/arquitetura/modelo/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends BaseService<Produto>{

  constructor(httpClient: HttpClient) {
    super( httpClient, 'produto');
  }

  listarProdutosDTO() {

    return this.httpClient.get<any>(`${this.API}/${this.path}/listar-dtos`);

  }

}
