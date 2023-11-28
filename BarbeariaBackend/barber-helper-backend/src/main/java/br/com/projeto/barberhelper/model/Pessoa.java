package br.com.projeto.barberhelper.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "tb_pessoa")
public class Pessoa extends EntidadeGenerica {

    private String nome;

    private String cpf;

    private String telefone;

    private boolean flagFuncionario;

    private String descricaoFuncionario;

    public Pessoa(Long id) {

        this.setId(id);

    }

}
