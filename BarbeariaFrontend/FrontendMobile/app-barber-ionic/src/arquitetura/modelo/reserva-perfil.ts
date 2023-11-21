import {StatusReservaEnum} from "./enum/status-reserva.enum";
import {Servico} from "./servico.model";

export class ReservaPerfil {

  servico: Servico = new Servico;
  data: Date = new Date;
  statusReserva: StatusReservaEnum = StatusReservaEnum.RESERVADO;

  constructor() {}

}
