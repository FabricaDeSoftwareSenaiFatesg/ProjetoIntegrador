package br.com.projeto.barberhelper.repository;

import br.com.projeto.barberhelper.generic.DAO;
import br.com.projeto.barberhelper.model.Produto;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoDAO extends DAO<Long, Produto> {
}
