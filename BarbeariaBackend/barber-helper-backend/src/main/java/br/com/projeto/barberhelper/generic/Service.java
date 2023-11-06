package br.com.projeto.barberhelper.generic;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

public interface Service<ID extends Serializable, E extends Serializable> {

    E get(ID id);

    List<E> get(Collection<ID> ids);

    E salvar(E entidade);

    void salvar(Collection<E> lista);

    void alterarStatus(E entidade);

    void excluir(E entidade);

    void excluirPorId(ID id);

    List<E> listar();

    List<E> listarAtivos();

    Long count();

    DAO<ID, E> getDAO();

    void validarInativacao(E entidade);

}