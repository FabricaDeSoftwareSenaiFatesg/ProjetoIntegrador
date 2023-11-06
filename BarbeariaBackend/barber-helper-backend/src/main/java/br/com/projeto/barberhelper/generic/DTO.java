package br.com.projeto.barberhelper.generic;

import br.com.projeto.barberhelper.model.EntidadeGenerica;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class DTO {

    private Long id;

    private Boolean ativo;

    private Date dataCadastro;

    public DTO() {

    }

    public DTO(EntidadeGenerica entidade) {
        super();
        this.id = entidade.getId();
        this.ativo = entidade.getAtivo();
        this.dataCadastro = entidade.getDataCadastro();
    }

}