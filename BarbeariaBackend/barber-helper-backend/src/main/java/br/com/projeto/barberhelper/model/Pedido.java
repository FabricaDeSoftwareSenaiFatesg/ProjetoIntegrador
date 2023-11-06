package br.com.projeto.barberhelper.model;

import br.com.projeto.barberhelper.model.enuns.StatusPedidoEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "tb_pedido")
public class Pedido extends EntidadeGenerica {

    @LazyCollection(LazyCollectionOption.FALSE)
    @ManyToMany
    @JoinTable(name = "tb_pedido_produto", joinColumns = {@JoinColumn(name = "id_pedido")}, inverseJoinColumns = {@JoinColumn(name = "id_produto")})
    private List<Produto> produtos;

    @OneToOne
    @JoinColumn(name = "id_cliente", referencedColumnName = "id")
    private Pessoa cliente;

    private Date dataPedido;

    @Enumerated(EnumType.STRING)
    private StatusPedidoEnum statusPedido;

    @Transient
    private BigDecimal total;

}
