package br.com.projeto.barberhelper.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "tb_promocao")
public class Promocao extends EntidadeGenerica {

    private String descricao;

    private LocalDate dataInicio;

    private LocalDate dataFim;

    private BigDecimal desconto;

    @LazyCollection(LazyCollectionOption.FALSE)
    @ManyToMany
    @JoinTable(name = "tb_promocao_servico", joinColumns = {@JoinColumn(name = "id_promocao")}, inverseJoinColumns = {@JoinColumn(name = "id_servico")})
    private List<Servico> servicos;

    @LazyCollection(LazyCollectionOption.FALSE)
    @ManyToMany
    @JoinTable(name = "tb_promocao_produto", joinColumns = {@JoinColumn(name = "id_promocao")}, inverseJoinColumns = {@JoinColumn(name = "id_produto")})
    private List<Produto> produtos;

}
