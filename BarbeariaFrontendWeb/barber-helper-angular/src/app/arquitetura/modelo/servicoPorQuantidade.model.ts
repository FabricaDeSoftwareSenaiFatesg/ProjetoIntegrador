import {Entidade} from "./entidade.model";

export class ServicoPorQuantidade extends Entidade {

  nomeServico: string = "";

  quantidade: number = 0;

  constructor() {
    super();
  }

}
