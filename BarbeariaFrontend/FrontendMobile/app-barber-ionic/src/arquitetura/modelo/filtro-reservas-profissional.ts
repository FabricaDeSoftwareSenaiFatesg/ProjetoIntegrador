import {Pessoa} from "./pessoa.model";
import {StatusReservaEnum} from "./enum/status-reserva.enum";

export class FiltroReservasProfissional {
  profissional?: Pessoa;
  data?: Date;
  status?: StatusReservaEnum;
}
