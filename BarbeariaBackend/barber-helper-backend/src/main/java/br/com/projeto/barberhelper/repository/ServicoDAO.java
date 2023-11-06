package br.com.projeto.barberhelper.repository;

import br.com.projeto.barberhelper.generic.DAO;
import br.com.projeto.barberhelper.model.Servico;
import org.springframework.stereotype.Repository;

@Repository
public interface ServicoDAO extends DAO<Long, Servico> {
}
