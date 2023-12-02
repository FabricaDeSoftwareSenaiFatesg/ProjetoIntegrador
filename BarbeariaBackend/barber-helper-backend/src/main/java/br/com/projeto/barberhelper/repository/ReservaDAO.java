package br.com.projeto.barberhelper.repository;

import java.util.Date;
import java.util.List;

import javax.ws.rs.client.Client;

import br.com.projeto.barberhelper.generic.DAO;
import br.com.projeto.barberhelper.model.Pessoa;
import br.com.projeto.barberhelper.model.Reserva;
import br.com.projeto.barberhelper.model.enuns.StatusReservaEnum;

import org.springframework.stereotype.Repository;

@Repository
public interface ReservaDAO extends DAO<Long, Reserva> {

    List<Reserva> getReservasByClienteAndDataInicialGreaterThanEqualAndStatusReservaEquals(Pessoa cliente, Date dataInicial, StatusReservaEnum status);

    List<Reserva> getReservasByFuncionarioAndDataInicialBetweenAndStatusReservaEquals(Pessoa funcionario, Date dataInicial, Date dataInicial2, StatusReservaEnum statusReserva);
}
