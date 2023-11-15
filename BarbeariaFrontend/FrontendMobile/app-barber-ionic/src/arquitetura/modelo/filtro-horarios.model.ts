import {Servico} from "./servico.model";
import {Pessoa} from "./pessoa.model";

export class FiltroHorarios {
  data?: Date;
  servicos: Servico[] = [];
  profissional?: Pessoa;
}
