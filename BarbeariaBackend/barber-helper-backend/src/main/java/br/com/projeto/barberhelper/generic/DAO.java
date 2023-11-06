package br.com.projeto.barberhelper.generic;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.io.Serializable;
import java.util.List;

public interface DAO<ID extends Serializable, E extends Serializable> extends JpaRepository<E, ID>, JpaSpecificationExecutor<E> {

    List<E> findAllByAtivo(boolean ativo);

}
