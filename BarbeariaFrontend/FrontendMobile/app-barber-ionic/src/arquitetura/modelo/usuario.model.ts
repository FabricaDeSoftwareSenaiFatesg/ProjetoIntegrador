import {Entidade} from "./entidade.model";
import {Pessoa} from "./pessoa.model";
import {TipoUsuarioEnum} from "./enum/tipo-usuario.enum";

export class UsuarioModel extends Entidade{
  email: string = '';
  senha: string = '';
  pessoa: Pessoa = new Pessoa();
  tipo: TipoUsuarioEnum = TipoUsuarioEnum.CLIENTE;

  constructor() {
    super();
  }
}
