import { Entidade } from './entidade.model';
import { Imagem } from './imagem.model';

export class Pessoa extends Entidade {
  nome: string = "";
  cpf: string = "";
  telefone: string = "";
  flagFuncionario: boolean = false;
  descricaoFuncionario: string = "";
  email?: string = "";
  imagemPerfil: Imagem = new Imagem();

  constructor() {
    super();
  }

}
