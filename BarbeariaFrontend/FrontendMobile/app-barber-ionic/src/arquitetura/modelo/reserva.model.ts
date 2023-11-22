import {Pessoa} from "./pessoa.model";
import {Entidade} from "./entidade.model";
import {Servico} from "./servico.model";
import {StatusReservaEnum} from "./enum/status-reserva.enum";

export class ReservaModel extends Entidade{
  cliente: Pessoa = new Pessoa();
  funcionario: Pessoa = new Pessoa();
  servicos: Servico[] = [];
  total: number = 0;
  totalText: string = ''
  dataInicial: Date = new Date();
  dataFim: Date = new Date();
  dataHoraText: string = '';
  statusReserva: StatusReservaEnum = StatusReservaEnum.RESERVADO;

  constructor() {
    super();
  }
}
