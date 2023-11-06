package br.com.projeto.barberhelper.model.dto.listagem;

import br.com.projeto.barberhelper.generic.DTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImagemListagemDTO extends DTO {

    private String nome;

    private byte[] conteudo;

    private String tamanho;

    private String tipo;

    private String dimensoes;

}
