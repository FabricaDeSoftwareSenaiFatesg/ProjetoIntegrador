import {Entidade} from "./entidade.model";

export class ReservaListagemModel extends Entidade {

  clienteNome!: string;

  funcionarioNome!: string;

  servicoNome!: string;

  data!: string;

  inicio!: string;

  fim!: string;

  status!: string;
}
