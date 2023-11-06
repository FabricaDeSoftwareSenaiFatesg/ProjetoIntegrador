package br.com.projeto.barberhelper.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FuncionarioPorReservaDTO {

    private String nomeFuncionario;
    private Integer quantidadeServicos;

    public FuncionarioPorReservaDTO() {}

    public FuncionarioPorReservaDTO(String nomeFuncionario, Integer quantidadeServicos) {
        this.nomeFuncionario = nomeFuncionario;
        this.quantidadeServicos = quantidadeServicos;
    }

}
