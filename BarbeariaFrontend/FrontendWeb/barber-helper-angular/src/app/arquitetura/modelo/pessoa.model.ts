import { Entidade } from './entidade.model';

export class Pessoa extends Entidade {

  nome: string = "";

  cpf: string = "";

  telefone: string = "";

  flagFuncionario: boolean = false;

  descricaoFuncionario: string = "";

  constructor() {
    super();
  }

}
