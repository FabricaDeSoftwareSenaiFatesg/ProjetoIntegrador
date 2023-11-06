package br.com.projeto.barberhelper.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ServicoPorQuantidadeDTO {

    private String nomeServico;
    private Integer quantidadeServico;

    public ServicoPorQuantidadeDTO() {}

    public ServicoPorQuantidadeDTO(String nomeServico, Integer quantidadeServico) {
        this.nomeServico = nomeServico;
        this.quantidadeServico = quantidadeServico;
    }
}
