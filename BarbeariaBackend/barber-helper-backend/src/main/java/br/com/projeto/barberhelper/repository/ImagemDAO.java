package br.com.projeto.barberhelper.repository;

import br.com.projeto.barberhelper.generic.DAO;
import br.com.projeto.barberhelper.model.Imagem;
import org.springframework.stereotype.Repository;

@Repository
public interface ImagemDAO extends DAO<Long, Imagem> {
}
