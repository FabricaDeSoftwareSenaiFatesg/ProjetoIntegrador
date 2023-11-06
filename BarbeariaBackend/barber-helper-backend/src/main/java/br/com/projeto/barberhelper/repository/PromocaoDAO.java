package br.com.projeto.barberhelper.repository;

import br.com.projeto.barberhelper.generic.DAO;
import br.com.projeto.barberhelper.model.Promocao;
import org.springframework.stereotype.Repository;

@Repository
public interface PromocaoDAO extends DAO<Long, Promocao> {
}
