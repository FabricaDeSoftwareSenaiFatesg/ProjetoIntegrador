package br.com.projeto.barberhelper.serviceImpl;

import java.util.List;

import javax.persistence.Tuple;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.projeto.barberhelper.generic.DAO;
import br.com.projeto.barberhelper.generic.ServiceGenerico;
import br.com.projeto.barberhelper.model.Imagem;
import br.com.projeto.barberhelper.model.Servico;
import br.com.projeto.barberhelper.repository.ServicoDAO;
import br.com.projeto.barberhelper.service.ServicoService;

@Service
public class ServicoServiceImpl extends ServiceGenerico<Long, Servico> implements ServicoService {

    @Autowired
    private ServicoDAO dao;

    @Override
    public DAO<Long, Servico> getDAO() {
        return dao;
    }

    @Override
    public void preSalvar(final Servico entidade) {
    }

    @Override
    public List<Servico> listarServicosDTO() {

        final CriteriaBuilder builder = em.getCriteriaBuilder();
        final CriteriaQuery<Tuple> query = builder.createTupleQuery();
        final Root<Servico> root = query.from(Servico.class);
        final Join<Servico, Imagem> rootImagem = root.join("imagem");

        query.select(builder.tuple(
                root.get("id").alias("id"),
                root.get("valor").alias("valor"),
                root.get("descricao").alias("descricao"),
                root.get("tempo").alias("tempo"),

                rootImagem.get("id").alias("imagem.id"),
                rootImagem.get("nome").alias("imagem.nome"),
                rootImagem.get("conteudo").alias("imagem.conteudo"),
                rootImagem.get("tipo").alias("imagem.tipo")));

        return this.executeQueryAndTransforResult(query, Servico.class);
    }
}
