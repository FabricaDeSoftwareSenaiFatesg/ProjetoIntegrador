package br.com.projeto.barberhelper.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import br.com.projeto.barberhelper.model.enuns.StatusReservaEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "tb_reserva")
public class Reserva extends EntidadeGenerica {

    @ManyToOne
    @JoinColumn(name = "id_cliente", referencedColumnName = "id")
    private Pessoa cliente;

    @ManyToOne
    @JoinColumn(name = "id_funcionario", referencedColumnName = "id")
    private Pessoa funcionario;

    @LazyCollection(LazyCollectionOption.FALSE)
    @ManyToMany
    @JoinTable(name = "tb_reserva_servico", joinColumns = {@JoinColumn(name = "id_reserva")}, inverseJoinColumns = {@JoinColumn(name = "id_servico")})
    private List<Servico> servicos;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dataInicial;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dataFim;

    @Enumerated(EnumType.STRING)
    private StatusReservaEnum statusReserva = StatusReservaEnum.RESERVADO;

    @Transient
    private BigDecimal total;
}
