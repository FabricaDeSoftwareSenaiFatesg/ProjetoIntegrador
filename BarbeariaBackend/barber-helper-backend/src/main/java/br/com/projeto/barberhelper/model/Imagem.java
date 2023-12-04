package br.com.projeto.barberhelper.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "tb_imagem")
public class Imagem extends EntidadeGenerica {

    @Column(name = "nm_imagem", length = 120)
    private String nome;

    @Column(name = "conteudo", length = 20)
    private byte[] conteudo;

    @Column(name = "tamanho", length = 120)
    private String tamanho;

    @Column(name = "tipo", length = 120)
    private String tipo;

    @Column(name = "dimensoes", length = 120)
    private String dimensoes;

}
