import { StatusReservaEnum } from './status-reserva.enum';
import { Entidade } from './entidade.model';
import { Servico } from './servico.model';
import { Pessoa } from './pessoa.model';

export class Reserva extends Entidade {

  cliente: Pessoa = new Pessoa;

  funcionario: Pessoa = new Pessoa;

  servicos: Servico[] = [];

  total: number = 0;

  dataInicial: Date = new Date;

  dataFim: Date = new Date;

  statusReserva: StatusReservaEnum = StatusReservaEnum.RESERVADO;

  constructor() {
    super();
  }
}
