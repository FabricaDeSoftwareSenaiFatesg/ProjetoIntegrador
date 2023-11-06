import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { BaseService } from 'src/app/arquitetura/service/base.service';
import { Pedido } from 'src/app/arquitetura/modelo/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class ServicosService extends BaseService<Pedido>{

  constructor(httpClient: HttpClient) {
    super( httpClient, 'servico');
  }

}
