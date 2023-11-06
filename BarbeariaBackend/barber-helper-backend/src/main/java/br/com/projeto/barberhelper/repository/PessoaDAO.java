package br.com.projeto.barberhelper.repository;

import br.com.projeto.barberhelper.generic.DAO;
import br.com.projeto.barberhelper.model.Pessoa;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PessoaDAO extends DAO<Long, Pessoa> {

    List<Pessoa> findAllByIdIn(List<Long> ids);

}
