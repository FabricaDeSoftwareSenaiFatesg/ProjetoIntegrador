import { Entidade } from './entidade.model';
import { Pessoa } from './pessoa.model';
import { Produto } from './produto.model';
import { StatusPedidoEnum } from './status-pedido.enum';

export class Pedido extends Entidade {

  cliente: Pessoa;

  produtos: Produto[] = [];

  dataPedido: Date;

  statusPedido: StatusPedidoEnum;

  total: number = 0;

  constructor() {
    super();
  }

}
