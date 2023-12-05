package br.com.projeto.barberhelper.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;

import java.util.Objects;

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

    @Transient
    private Imagem imagemPerfil;

    public Pessoa(Long id) {

        this.setId(id);

    }

    public String getNomeFormatadoDashBoard() {

        if (!Objects.isNull(nome)) {

            String[] nomeSeparado = nome.split(" ");

            if (!Objects.isNull(nomeSeparado) && nomeSeparado.length > 1) {

            } else {
                return nomeSeparado[0];
            }

            return nomeSeparado[0] + " " + nomeSeparado[1]. substring(0, 1);

        } else {
            return "";
        }

    }

}
