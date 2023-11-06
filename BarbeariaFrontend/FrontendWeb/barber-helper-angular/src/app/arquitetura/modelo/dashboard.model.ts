import {Entidade} from "./entidade.model";
import {Pedido} from "./pedido.model";
import {Servico} from "./servico.model";
import {FuncionarioPorReserva} from "./funcionarioPorReserva.model";
import {ServicoPorQuantidade} from "./servicoPorQuantidade.model";

export class Dashboard extends Entidade {

  pedidos: Pedido[] = [];
  servicos: Servico[] = [];
  funcionariosPorReserva: FuncionarioPorReserva[] = [];
  servicosPorQuantidade: ServicoPorQuantidade[] = [];

  constructor() {
    super();
  }

}
