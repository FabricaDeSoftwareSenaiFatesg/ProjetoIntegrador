import { StatusPedidoEnum } from "./status-pedido.enum";
import { StatusReservaEnum } from "./status-reserva.enum";

export class PerfilDTO {

  dtUltimaReserva: string;

  qtdReservasFeitas: number;

  statusUltimaReserva: StatusReservaEnum;

  dtUltimaCompra: string;

  qtdPedidosFeito: number;

  statusUltimaCompra: StatusPedidoEnum;

  constructor() {
  }
}
