import { Entidade } from './entidade.model';

export class Imagem extends Entidade {

  nome: string;

  conteudo: any;

  tamanho: string;

  tipo: string;

  dimensoes: string;

  constructor() {
    super();
  }

}
