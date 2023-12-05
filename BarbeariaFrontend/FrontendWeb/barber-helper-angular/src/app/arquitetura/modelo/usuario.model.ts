import { Entidade } from './entidade.model';
import { Imagem } from './imagem.model';
import { Pessoa } from './pessoa.model';
import { TipoUsuarioEnum } from './tipo-usuario.enum';

export class Usuario extends Entidade {

  email: string = "";

  senha: string = "";

  pessoa: Pessoa = new Pessoa;

  tipo: TipoUsuarioEnum = TipoUsuarioEnum.CLIENTE;

  imagem?: Imagem;

  constructor() {
    super();
  }

}
