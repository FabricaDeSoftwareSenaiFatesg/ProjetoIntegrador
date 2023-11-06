package br.com.projeto.barberhelper.repository;

import br.com.projeto.barberhelper.generic.DAO;
import br.com.projeto.barberhelper.model.Reserva;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservaDAO extends DAO<Long, Reserva> {
}
