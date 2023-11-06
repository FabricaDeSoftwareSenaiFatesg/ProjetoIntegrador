package br.com.projeto.barberhelper.model.dto.listagem;

import br.com.projeto.barberhelper.generic.DTO;
import br.com.projeto.barberhelper.model.Imagem;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProdutoListagemDTO extends DTO {

    private BigDecimal valor;

    private String descricao;

    private Long quantidade;

    private Imagem imagem;

}
