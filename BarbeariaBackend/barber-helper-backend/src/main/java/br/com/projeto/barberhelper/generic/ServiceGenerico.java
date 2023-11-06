package br.com.projeto.barberhelper.generic;

import br.com.projeto.barberhelper.model.EntidadeGenerica;
import br.com.projeto.barberhelper.model.Usuario;
import br.com.projeto.barberhelper.utils.DateUtil;
import br.com.projeto.barberhelper.utils.TransformerTuple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;

import javax.persistence.EntityManager;
import javax.persistence.Tuple;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import java.io.Serializable;
import java.util.*;
import java.util.stream.Collectors;

public abstract class ServiceGenerico<ID extends Serializable, E extends EntidadeGenerica> implements Service<ID, E> {

    @Autowired
    protected EntityManager em;

    protected Usuario usuarioLogado;

    @Override
    public E get(ID id) {

        return this.getDAO().findById( id ).get();

    }

    @Override
    public List<E> get(Collection<ID> ids) {

        return this.getDAO().findAllById(ids);

    }

    @Override
    public E salvar(E entidade) {

        this.preSalvar( entidade );

        if( entidade.getId() == null ) {

            entidade.setDataCadastro( DateUtil.hoje() );

        }

        return this.getDAO().save( entidade );

    }

    @Override
    public void salvar(final Collection<E> lista) {

        lista.parallelStream().forEach( e -> this.salvar( e ) );

    }

    @Override
    public void alterarStatus(final E entidade) {

        entidade.setAtivo( entidade.getAtivo() == null || !entidade.getAtivo() ? true : false );

        if( !entidade.getAtivo() ) {

            this.validarInativacao( entidade );

        }

        this.getDAO().save( entidade );

    }

    @Override
    public void validarInativacao(E entidade) {

    }

    @Override
    public void excluir(E entidade) {

        preRemover( entidade );

        this.getDAO().delete( entidade );
    }

    @Override
    public void excluirPorId(ID id) {

        try {

            this.getDAO().deleteById( id );

        } catch( DataIntegrityViolationException e ) {

            //throw new ServicoException( MessageSupport.getMessage( "MSG_EXCLUSAO" ) );

        }

    }

    @Override
    public List<E> listar() {

        return this.getDAO().findAll();

    }

    @Override
    public List<E> listarAtivos() {

        return this.getDAO().findAllByAtivo( true );

    }

    @Override
    public Long count() {

        return this.getDAO().count();

    }

    public void preSalvar(E entidade) {

    }

    public void preRemover(E entidade) {

    }

    protected <T> List<T> executeQueryAndTransforResult(CriteriaQuery<Tuple> query, Class<T> clazz) {

        final TypedQuery<Tuple> typedQuery = em.createQuery(query);

        final List<Tuple> tuples = typedQuery.getResultList();

        final List<T> result =  tuples

                .stream()

                .map(tuple -> TransformerTuple.transformer(tuple, clazz))

                .collect(Collectors.toList());

        this.cleanAndCloseEntityConnection();

        return result;

    }

    protected void cleanAndCloseEntityConnection() {

        em.clear();

        em.close();

    }

}
